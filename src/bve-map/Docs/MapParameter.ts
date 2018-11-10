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
   * @param isStructureKey この引数はストラクチャーキーか？(Optional)
   * @param isTrackKey この引数はトラックキーか？(Optional)
   */
  constructor(public Name: string, public Document: vscode.MarkdownString, public isStructureKey: boolean = false, public isTrackKey: boolean = false) {}

  /**
   * ParameterInfoを取得します。
   */
  public getParameterInfo(): vscode.ParameterInformation {
    return new vscode.ParameterInformation(this.Name, this.Document)
  }
}
