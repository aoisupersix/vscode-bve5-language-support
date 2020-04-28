import * as vscode from 'vscode'

import { MapDoc } from '../Docs/MapDoc'

/**
 * マップ構文の各種キーを管理するインタフェース
 */
export interface KeyList {
  /**
   * 現在格納されているキーをすべて削除します。
   */
  clearKey(): void

  /**
   * 現在格納されているキーを配列で返します。
   */
  getKeys(): any[]

  /**
   * 現在格納されているキーのCompletionItemを返します。
   */
  getCompletionItems(): vscode.CompletionItem[]

  /**
   * 引数に与えられた構文のキー種別が一致するか？
   * @param functionName 構文名
   */
  isMatchFunctionKey(functionName: string): boolean

  /**
   * 引数に与えられた構文の引数がキー種別と一致するか？
   * @param syntaxes 探索対象の構文
   * @param syntaxName 構文名
   * @param paramCount 引数番号（何番目の引数か？）
   */
  isMatchArgumentKey(
    syntaxes: MapDoc[],
    syntaxName: string,
    paramCount: number
  ): boolean
}
