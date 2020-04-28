import * as vscode from 'vscode'

import * as util from '../util'
import { MapDocs } from './Docs/MapDocs'

/**
 * マップ構文のシグネチャヘルプを提供します。
 */
export class MapSignatureHelpProvider implements vscode.SignatureHelpProvider {
  public provideSignatureHelp(
    document: vscode.TextDocument,
    position: vscode.Position
  ): Promise<vscode.SignatureHelp> {
    // テキスト取得
    const txt = util.trimMapText(
      document.getText(new vscode.Range(new vscode.Position(0, 0), position))
    )
    const nowChar = txt.substring(txt.length - 1)
    const funcName = this.getFuncName(txt)
    const funcFirstIdx = txt.lastIndexOf(funcName)
    const paramCount = this.getNowParamCount(txt)

    return new Promise((resolve, reject) => {
      if (
        nowChar === ')' ||
        nowChar === ';' ||
        txt.substring(funcFirstIdx).match(/\(/) === null
      ) {
        reject()
      } else {
        const syntaxes = MapDocs.Instance.getSyntaxes()
        for (const syntax of syntaxes) {
          if (syntax.isMatchSyntax(funcName)) {
            const ret = syntax.getSignatureHelp(paramCount)
            resolve(ret)
          }
        }
        reject()
      }
    })
  }

  /**
   * 引数に与えられた文字列から関数名を取得して返します。
   * @param trimedText 整形済みのマップファイルテキスト
   */
  private getFuncName(trimedText: string): string {
    const startIdx = trimedText.lastIndexOf(';') + 1
    let endIdx = trimedText.lastIndexOf('(')
    if (endIdx === -1) {
      endIdx = trimedText.length - 1
    }
    return trimedText.substring(startIdx, endIdx)
  }

  /**
   * 引数に与えられた文字列から現在位置のパラメータ数を取得して返します。
   * パラメータ数が取得できない場合は-1を返します。
   * @param trimedText 整形済みのマップファイルテキスト
   */
  private getNowParamCount(trimedText: string): number {
    const startIdx = trimedText.lastIndexOf('(')
    if (startIdx === -1) {
      return -1
    }
    const txt = trimedText.substring(startIdx)
    const m = txt.match(/,/gm)
    if (m !== null) {
      return m.length
    }
    return 0
  }
}
