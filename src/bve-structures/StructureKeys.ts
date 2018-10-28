'use strict';

import { loadFile, trimWhiteSpace } from '../util';
import { List } from 'linqts';
import * as csvSync from 'csv-parse/lib/sync';

export class StructureKeys {
  /**
   * インスタンス
   */
  private static _instance: StructureKeys

  private _keyList: List<string[]> = new List<string[]>();

  public get KeyList() {
    return this._keyList;
  }

  /**
   * インスタンスを取得します。
   */
  public static get instance(): StructureKeys {
    if (!this._instance) {
      this._instance = new StructureKeys()
    }

    return this._instance
  }

  /**
   * 引数に与えられたストラクチャーリストファイルのファイルパスからキーを取得します。
   * @param filePath ファイルパス
   */
  public loadFromFilePath(filePath: string) {
    let data = loadFile(filePath);

    let headerRegex = /^\s*BveTs\s*Structure\s*List\s*\d+\.\d+\s*(?::.*)?\s*(?:$|\r\n|\n|\r)/gi
    if (data.match(headerRegex)) {
      console.log("Loaded structures list file.");
      data = trimWhiteSpace(data, headerRegex);
      const matrix = csvSync(data);

      const keyList = new List<string[]>(matrix);
      this._keyList = keyList.Where(k => k !== undefined && k.length == 2);
    }
  }
}
