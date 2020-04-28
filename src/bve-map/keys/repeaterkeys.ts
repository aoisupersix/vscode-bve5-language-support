import * as Enumerable from 'linq'
import * as vscode from 'vscode'

import * as headers from '../../const/headers'
import { COMMENT } from '../../const/syntaxes'
import { trimWhiteSpace } from '../../util'
import { MapDoc } from '../docs/mapdoc'
import { KeyList } from './key-list'
import { KeyLoaderFromMapSyntax } from './key-loader-from-mapsyntax'

/**
 * 連続ストラクチャーキークラス
 */
export class RepeaterKeys implements KeyList, KeyLoaderFromMapSyntax {
  private keyList: string[] = []

  /**
   * 現在格納されているキーをすべて削除します。
   */
  public clearKey(): void {
    this.keyList = []
  }

  /**
   * 引数に与えられたマップ構文からキーを取得して格納します。
   * @param mapText マップ構文
   */
  public addKeys(mapText: string): void {
    const trimedMapText = trimWhiteSpace(
      mapText,
      headers.MAP_HEADER,
      COMMENT,
      true
    )
    const repeaterRegex = /Repeater\['(.+)'\]/i
    const keys = Enumerable.from(trimedMapText.split(';'))
      .select((t) => repeaterRegex.exec(t))
      .where((r) => r !== null)
      .select((r) => r[1])
      .distinct()

    this.keyList = this.keyList.concat(keys.toArray())
  }

  /**
   * 現在格納されているキーのCompletionItemを返します。
   */
  public getCompletionItems(): vscode.CompletionItem[] {
    const items = this.keyList.map((k) => {
      const item = new vscode.CompletionItem(
        k,
        vscode.CompletionItemKind.Keyword
      )
      item.detail = k
      item.documentation = '連続ストラクチャー'
      return item
    })

    return items
  }

  /**
   * 引数に与えられた構文のキー種別が一致するか？
   * @param functionName 構文名
   */
  public isMatchFunctionKey(functionName: string): boolean {
    return functionName.match(/Repeater/i) !== null
  }

  /* eslint-disable */
  /**
   * 引数に与えられた構文の引数がキー種別と一致するか？
   * @param syntaxes 探索対象の構文
   * @param syntaxName 構文名
   * @param paramCount 引数番号（何番目の引数か？）
   */
  public isMatchArgumentKey(
    syntaxes: MapDoc[],
    syntaxName: string,
    paramCount: number
  ): boolean {
    /* eslint-enable */
    // 該当なし
    return false
  }
}
