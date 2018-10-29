'use strict'
import * as vscode from 'vscode'

/**
 * 車両ファイルの要素を格納するクラス
 */
export class VehicleDoc {
  private _elementName: string
  private _description: string

  /**
   * デフォルトのコンストラクタ
   * @param elem_name 要素名
   * @param description 要素の説明
   */
  constructor(elem_name: string, description: string) {
    this._elementName = elem_name
    this._description = description
  }

  /**
   * 引数に与えられた要素名と一致するか？
   * @param elem_name 要素名
   */
  isMatch(elem_name: string): boolean {
    return elem_name.match(new RegExp(`${this._elementName}`, 'gi')) !== null
  }

  /**
   * ホバーを取得します。
   * @param range　ホバー範囲
   */
  getMapHover(range: vscode.Range): vscode.Hover {
    return new vscode.Hover(
      [
        new vscode.MarkdownString(`${this._elementName}`),
        new vscode.MarkdownString(`${this._description}`)
      ],
      range
    )
  }
}
