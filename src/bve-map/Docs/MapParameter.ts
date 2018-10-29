'use strict'

import * as vscode from 'vscode'

/**
 * 構文の引数を格納するクラス
 */
export class MapParameter {
  /**
   * デフォルトのコンストラクタ
   * @param Name 引数名
   * @param Document 引数の説明
   */
  constructor(public Name: string, public Document: vscode.MarkdownString) {}

  /**
   * ParameterInfoを取得します。
   */
  public getParameterInfo(): vscode.ParameterInformation {
    return new vscode.ParameterInformation(this.Name, this.Document)
  }
}
