import * as fs from 'fs';
import * as encoding from 'encoding-japanese';
import * as iconv from 'iconv-lite';
import * as csvSync from 'csv-parse/lib/sync';

export class StructureKeys {
  /**
   * インスタンス
   */
  private static _instance: StructureKeys

  private keyList: string[] = []

  /**
   * インスタンスを取得します。
   */
  public static get instance(): StructureKeys {
    if (!this._instance) {
      this._instance = new StructureKeys()
    }

    return this._instance
  }

  public loadFromFilePath(filePath: string) {
    const buf = fs.readFileSync(filePath);
    const encode = encoding.detect(buf);
    const data = iconv.decode(buf, encode);
    //csvSync(data);
    console.log(data);
  }
}
