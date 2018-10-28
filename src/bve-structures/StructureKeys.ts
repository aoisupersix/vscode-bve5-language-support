import * as fs from 'fs';

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
    const data = fs.readFileSync(filePath);
    console.log(data);
  }
}
