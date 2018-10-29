'use strict'

import { trimWhiteSpace } from '../util'
import { List } from 'linqts'
import * as headers from '../const/headers';
import * as csvSync from 'csv-parse/lib/sync'

/**
 * ストラクチャーキークラス
 */
export class StructureKeys {
  /**
   * インスタンス
   */
  private static _instance: StructureKeys

  private _keyList: List<string[]> = new List<string[]>()

  public get KeyList() {
    return this._keyList
  }

  public clearKey() {
    this._keyList.RemoveAll
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
   * 引数に与えられたストラクチャーリストファイルからキーを取得しますして追加します。
   * @param data ストラクチャーリストファイル
   */
  public addKeys(data: string) {
    data = trimWhiteSpace(data, headers.STRUCTURES_HEADER)
    const matrix = csvSync(data)

    const keyList = new List<string[]>(matrix)
    this._keyList = keyList.Where(k => k !== undefined && k.length == 2)
  }
}
