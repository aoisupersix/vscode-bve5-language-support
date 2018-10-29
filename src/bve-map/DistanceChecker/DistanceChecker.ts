'use strict'

import * as vscode from 'vscode'
import * as util from '../../util'

/**
 * 距離程チェッカー
 */
export class DistanceChecker {
  private statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  )

  public updateDistance() {
    // テキストエディタを取得
    const editor = vscode.window.activeTextEditor
    if (!editor) {
      this.statusBarItem.hide()
      return
    }

    const doc = editor.document
    if (doc.languageId === 'bve-map-2.02') {
      const distString = this._getDistance(doc, editor.selections)

      this.statusBarItem.text = `距離程： ${distString} [m]`
      this.statusBarItem.show()
    } else {
      this.statusBarItem.hide()
    }
  }

  /**
   * 現在のカーソル位置の距離程を取得します。
   * @param doc TextDocument
   * @param selections Cursors
   */
  public _getDistance(
    doc: vscode.TextDocument,
    selections: vscode.Selection[]
  ): string {
    const distRegex = /(?:^|;)(?:\$[a-zA-Z]+|\d+(?:\.\d+)?)(?:[+\-*/%](?:\$[a-zA-Z]+|\d+(?:\.\d+)?))*;/g

    if (selections.length === 1) {
      const pos = selections[0].active
      const range = new vscode.Range(new vscode.Position(0, 0), pos)
      const utext = util.trimMapText(doc.getText(range))

      // 全ての距離程を取得
      const m = utext.match(distRegex)
      if (m !== null) {
        const nowDist = m[m.length - 1].replace(/;/g, '') // 現在の距離程
        const distNumber = nowDist.match(/^\d+(?:\.\d+)?$/gi)
        if (distNumber !== null) {
          return distNumber[0]
        }
      }
    }

    // 距離程なし
    return '---'
  }

  public dispose() {
    this.statusBarItem.dispose()
  }
}
