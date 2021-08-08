import * as Enumerable from 'linq'
import * as vscode from 'vscode'

import * as util from '../util'
import { MapSyntaxType } from './docs/mapdoc'
import { MapDocs } from './docs/mapdocs'
import { KeyList } from './keys/key-list'

/**
 * マップ構文のコード補完を提供します。
 */
export class MapCompletionItemProvider
  implements vscode.CompletionItemProvider
{
  public static readonly FUNC_COMPLETION_TOKEN: string = '.'
  public static readonly KEY_COMPLETION_TOKEN: string = "'"

  private keys: Enumerable.IEnumerable<KeyList>

  constructor(...keyList: KeyList[]) {
    this.keys = Enumerable.from(keyList)
  }

  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): Promise<vscode.CompletionItem[]> {
    // テキスト取得
    const txt = util.trimMapText(
      document.getText(new vscode.Range(new vscode.Position(0, 0), position))
    )
    const nowChar = txt.substring(txt.length - 1)

    if (nowChar === MapCompletionItemProvider.FUNC_COMPLETION_TOKEN) {
      return this.getFuncCompletionItems(txt)
    }
    if (nowChar === MapCompletionItemProvider.KEY_COMPLETION_TOKEN) {
      return this.getKeyCompletionItems(txt)
    }

    return new Promise((resolve, reject) => {
      reject()
    })
  }

  /**
   * 引数に与えられた文字列から現在の構文名を取得して返します。
   * 取得できなかった場合は空文字を返します。
   * @param trimedText 整形済みのマップファイルテキスト
   * @param endToken 取得する構文の終りを示すトークン
   */
  private getSyntaxName(trimedText: string, endToken: string): string {
    const startIdx = trimedText.lastIndexOf(';') + 1 // 前の構文が存在しない場合、-1が返されるが+1されて0になるため問題ない
    const endIdx = trimedText.lastIndexOf(endToken)

    if (endIdx === -1 || endIdx <= startIdx) {
      /* 結果なし */
      return ''
    }
    return trimedText.substring(startIdx, endIdx)
  }

  /**
   * 引数に与えられた文字列から現在の構文の引数をカウントして返します。
   * @param trimedMapText 整形済みのマップファイルテキスト
   */
  private getParamsCount(trimedText: string): number {
    const startIdx = trimedText.lastIndexOf('(')
    const endIdx = trimedText.length
    const txt = trimedText.substring(startIdx, endIdx)
    const count = txt.split(',').length - 1

    return count
  }

  /**
   * 引数に与えられた文字列の現在の構文名のシングルクォートが閉じているか？
   * @param trimedMapText 整形済みのマップファイルテキスト
   */
  private isSyntaxClosedQuote(trimedText: string): boolean {
    const startIdx = trimedText.lastIndexOf(';') + 1 // 前の構文が存在しない場合、-1が返されるが+1されて0になるため問題ない
    const endIdx = trimedText.length
    const txt = trimedText.substring(startIdx, endIdx)
    const count = txt.split("'").length - 1

    return count % 2 === 0 // 偶数であれば閉じている
  }

  /**
   * 関数名のCompletionItemを生成して返します。
   * @param txt マップ構文
   */
  private getFuncCompletionItems(
    txt: string
  ): Promise<vscode.CompletionItem[]> {
    return new Promise((resolve, reject) => {
      const targetSyntax = this.getSyntaxName(txt, '.')
      const syntaxes = MapDocs.Instance.getSyntaxes()
      const ret: vscode.CompletionItem[] = []

      if (targetSyntax === '') {
        reject()
        return
      }
      // 一致する補完の追加
      for (const syntax of syntaxes) {
        // 関数名補完
        if (syntax.isMatchMapElement(targetSyntax)) {
          const item = syntax.getFunctionCompletionItem()
          // 重複チェック
          if (!ret.some((x) => x.label === item.label)) {
            ret.push(item)
          }
        }
        if (syntax.getSyntaxType() === MapSyntaxType.Syntax3) {
          // シンタックス3のマップ要素2補完
          if (syntax.isMatchMapElement1(targetSyntax)) {
            const item = syntax.getMapElement2CompletionItem()
            // 重複チェック
            if (!ret.some((x) => x.label === item.label)) {
              ret.push(item)
            }
          }
        }
      }

      if (ret.length > 0) {
        resolve(ret)
      }

      reject()
    })
  }

  /**
   * キー名のCompletionItemを生成して返します。
   * @param trimedMapText マップ構文
   */
  private getKeyCompletionItems(
    trimedMapText: string
  ): Promise<vscode.CompletionItem[]> {
    return new Promise((resolve, reject) => {
      // シングルクォートが閉じているので補完を提供しない
      if (this.isSyntaxClosedQuote(trimedMapText)) {
        reject()
        return
      }

      if (trimedMapText.substring(trimedMapText.length - 2) === "['") {
        // 構文内のキー補完
        resolve(this.getFuncKeyCompletionItems(trimedMapText))
        return
      }
      // 引数内のキー補完
      resolve(this.getParamKeyCompletionItems(trimedMapText))
    })
  }

  /**
   * 構文内のキー補完アイテムを取得して返します。
   * 例えば、Track['hoge']のhogeの部分など。
   * @param trimedMapText マップ構文
   */
  private getFuncKeyCompletionItems(
    trimedMapText: string
  ): vscode.CompletionItem[] {
    const mapElementName = this.getSyntaxName(trimedMapText, '[')
    return this.keys
      .where((k) => k.isMatchFunctionKey(mapElementName))
      .selectMany((k) => k.getCompletionItems())
      .toArray()
  }

  /**
   * 構文引数内のストラクチャーキーとトラックキーの補完アイテムを取得して返します。
   * @param trimedMapText マップ構文
   */
  private getParamKeyCompletionItems(
    trimedMapText: string
  ): vscode.CompletionItem[] {
    const syntaxName = this.getSyntaxName(trimedMapText, '(')
    const paramCount = this.getParamsCount(trimedMapText)

    return this.keys
      .where((k) =>
        k.isMatchArgumentKey(
          MapDocs.Instance.getSyntaxes(),
          syntaxName,
          paramCount
        )
      )
      .selectMany((k) => k.getCompletionItems())
      .toArray()
  }
}
