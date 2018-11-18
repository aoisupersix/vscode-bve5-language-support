'use strict'

import { List } from 'linqts'
import * as vscode from 'vscode'

import * as headers from '../../const/headers'
import { COMMENT } from '../../const/syntaxes';
import { trimWhiteSpace } from '../../util'

/**
 * ストラクチャーキークラス
 */
export class TrackKeys {

  private keyList: List<string> = new List<string>()

  /**
   * ストラクチャーキーリスト
   */
  public get KeyList() {
    return this.keyList
  }

  /**
   * ストラクチャーキーリストを初期化します。
   */
  public clearKey() {
    this.keyList = new List<string>()
  }

  /**
   * 引数に与えられたマップ構文からキーを取得して追加します。
   * @param mapText マップ構文
   */
  public addKeys(mapText: string) {
    const trimedMapText = trimWhiteSpace(mapText, headers.MAP_HEADER, COMMENT, true)
    const trackRegex = /Track\['(.+)'\]/i
    const keys = new List<string>(trimedMapText.split(';'))
      .Select(t => trackRegex.exec(t))
      .Where(r => r !== null)
      .Select(r => r![1])
      .Distinct()
    this.keyList.AddRange(keys.ToArray())
  }

  /**
   * キーのCompletionItemを生成します。
   */
  public getCompletionItems(): vscode.CompletionItem[] {
    const items = this.keyList.Select(k => {
      const item = new vscode.CompletionItem(k, vscode.CompletionItemKind.Keyword)
      item.detail = k
      item.documentation = "トラック"
      return item
    }).ToArray()

    return items
  }
}