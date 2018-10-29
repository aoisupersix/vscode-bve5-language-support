'use strict'

import * as vscode from 'vscode'
import * as util from '../util'

import { MapDoc } from './Docs/MapDoc'
import { MapDocs } from './Docs/MapDocs'

/**
 * マップ構文のホバー表示を提供します。
 */
export class MapHoverProvider implements vscode.HoverProvider {
  
  public provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Thenable<vscode.Hover> {
    return new Promise((resolve, reject) => {
      const wordRange = document.getWordRangeAtPosition(position)
      if (wordRange === undefined) {
        reject()
        return
      }
      const nowWord = document.getText(wordRange)

      // マップ要素1のホバー
      const mapElements = MapDocs.Instance.getMapElements()
      for (const mElement of mapElements) {
        if (mElement.isMatchMapElement1(nowWord)) {
          resolve(mElement.getMapElement1Hover(wordRange))
          return
        }
      }

      // TODO マップ要素2のホバー

      // 関数名のホバー
      const syntaxes = MapDocs.Instance.getSyntaxes()
      // まずは一致する関数名を全て取得
      const funcs: MapDoc[] = []
      for (const syntax of syntaxes) {
        if (syntax.isMatchFuncName(nowWord)) {
          funcs.push(syntax)
        }
      }
      // 一致なし
      if (funcs.length === 0) {
        reject()
        return
      }
      // 一致する関数名が一つであれば、めでたくここでホバーを返す
      if (funcs.length === 1) {
        resolve(funcs[0].getFunctionHover(wordRange))
        return
      }
      // フルの構文名を取得
      const beforeText = util.trimMapText(
        document.getText(
          new vscode.Range(new vscode.Position(0, 0), wordRange.start)
        )
      )
      const startIdx = beforeText.lastIndexOf(';') + 1
      const syntaxName = beforeText.substring(startIdx) + nowWord
      for (const func of funcs) {
        if (func.isMatchSyntax(syntaxName)) {
          resolve(func.getFunctionHover(wordRange))
          return
        }
      }
      reject()
    })
  }
}
