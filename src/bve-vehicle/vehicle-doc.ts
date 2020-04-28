import * as vscode from 'vscode'

/**
 * 車両ファイルの要素を格納するクラス
 */
export class VehicleDoc {
  private elementName: string
  private description: string

  /**
   * デフォルトのコンストラクタ
   * @param elemName 要素名
   * @param description 要素の説明
   */
  constructor(elemName: string, description: string) {
    this.elementName = elemName
    this.description = description
  }

  /**
   * 引数に与えられた要素名と一致するか？
   * @param elemName 要素名
   */
  public isMatch(elemName: string): boolean {
    return elemName.match(new RegExp(`${this.elementName}`, 'gi')) !== null
  }

  /**
   * ホバーを取得します。
   * @param range ホバー範囲
   */
  public getMapHover(range: vscode.Range): vscode.Hover {
    return new vscode.Hover(
      [
        new vscode.MarkdownString(`${this.elementName}`),
        new vscode.MarkdownString(`${this.description}`),
      ],
      range
    )
  }
}
