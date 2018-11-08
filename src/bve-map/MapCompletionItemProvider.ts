'use strict'

import { List } from 'linqts'
import * as vscode from 'vscode'

import { StructureKeys } from '../bve-structures/StructureKeys'
import * as util from '../util'
import { MapSyntaxType } from './Docs/MapDoc'
import { MapDocs } from './Docs/MapDocs'

/**
 * マップ構文のコード補完を提供します。
 */
export class MapCompletionItemProvider
  implements vscode.CompletionItemProvider {
  public static readonly FUNC_COMPLETION_TOKEN: string = '.'
  public static readonly KEY_COMPLETION_TOKEN: string = "'"

  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Promise<vscode.CompletionItem[]> {
    // テキスト取得
    const txt = util.trimMapText(
      document.getText(new vscode.Range(new vscode.Position(0, 0), position))
    )
    const nowChar = txt.substring(txt.length - 1)

    if (nowChar === MapCompletionItemProvider.FUNC_COMPLETION_TOKEN) {
      return this.getFuncCompletionItems(txt)
    } else if (nowChar === MapCompletionItemProvider.KEY_COMPLETION_TOKEN) {
      return this.getKeyCompletionItems(txt)
    }

    return new Promise((resolve, reject) => {
      reject()
    })
  }

  /**
   * 引数に与えられた文字列から関数名を取得して返します。
   * @param trimedText 整形済みのマップファイルテキスト
   */
  private getFuncName(trimedText: string): string {
    const startIdx = trimedText.lastIndexOf(';') + 1
    let endIdx = trimedText.lastIndexOf('.')
    if (endIdx === -1 || endIdx <= startIdx) {
      endIdx = trimedText.length
    }
    return trimedText.substring(startIdx, endIdx)
  }

  /**
   * 関数名のCompletionItemを生成して返します。
   * @param txt マップ構文
   */
  private getFuncCompletionItems(
    txt: string
  ): Promise<vscode.CompletionItem[]> {
    return new Promise((resolve, reject) => {
      const mapElementName = this.getFuncName(txt)
      const syntaxes = MapDocs.Instance.getSyntaxes()
      const ret = new List<vscode.CompletionItem>()

      if (mapElementName === '') {
        reject()
      } else {
        // 一致する補完の追加
        for (const syntax of syntaxes) {
          // 関数名補完
          if (syntax.isMatchMapElement(mapElementName)) {
            const item = syntax.getFunctionCompletionItem()
            // 重複チェック
            if (!ret.Any(x => x!.label === item.label)) {
              ret.Add(item)
            }
          }
          if (syntax.getSyntaxType() === MapSyntaxType.Syntax3) {
            // シンタックス3のマップ要素2補完
            if (syntax.isMatchMapElement1(mapElementName)) {
              const item = syntax.getMapElement2CompletionItem()
              // 重複チェック
              if (!ret.Any(x => x!.label === item.label)) {
                ret.Add(item)
              }
            }
          }
        }
      }

      if (ret.Any()) {
        resolve(ret.ToArray())
      }

      reject()
    })
  }

  /**
   * キー名のCompletionItemを生成して返します。
   * @param trimedMapText マップ構文
   */
  private getKeyCompletionItems(trimedMapText: string): Promise<vscode.CompletionItem[]> {
    return new Promise((resolve, reject) => {
      if (trimedMapText.substring(trimedMapText.length - 2) === "['") {
        // 構文内のキー補完
        resolve(this.getFuncKeyCompletionItems(trimedMapText))
        return
      }
      // TODO
      reject()
    })
  }

  /**
   * 構文内のキー補完アイテムを取得して返します。
   * 例えば、Track['hoge']のhogeの部分など。
   * @param trimedMapText マップ構文
   */
  private getFuncKeyCompletionItems(trimedMapText: string): vscode.CompletionItem[] {
    const a = trimedMapText.substring(0, trimedMapText.length - 2)
    const mapElementName = this.getFuncName(a)
    if (mapElementName === 'Structure') {
      // ストラクチャーリストの表示
      return StructureKeys.Instance.getCompletionItems()
    }

    return []
  }
}
