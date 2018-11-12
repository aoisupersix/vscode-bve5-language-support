'use strict'

import * as csvSync from 'csv-parse/lib/sync'
import { List } from 'linqts'
import * as vscode from 'vscode'

import * as headers from '../const/headers'
import { trimWhiteSpace } from '../util'

/**
 * ストラクチャーキークラス
 */
export class StructureKeys {

  private static instance: StructureKeys
  private keyList: List<string[]> = new List<string[]>()

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
    this.keyList = new List<string[]>()
  }

  /**
   * インスタンスを取得します。
   */
  public static get Instance(): StructureKeys {
    if (!this.instance) {
      this.instance = new StructureKeys()
    }

    return this.instance
  }

  /**
   * 引数に与えられたストラクチャーリストファイルからキーを取得して追加します。
   * @param data ストラクチャーリストファイル
   */
  public addKeys(data: string) {
    data = trimWhiteSpace(data, headers.STRUCTURES_HEADER)
    const matrix = csvSync(data)

    const keyList = new List<string[]>(matrix)
    this.keyList = keyList.Where(k => k !== undefined && k.length === 2)
  }

  /**
   * キーのCompletionItemを生成します。
   */
  public getCompletionItems(): vscode.CompletionItem[] {
    const items = this.keyList.Select(k => {
      const item = new vscode.CompletionItem(k[0], vscode.CompletionItemKind.Keyword)
      item.detail = k[1]
      item.documentation = "ストラクチャー"
      return item
    }).ToArray()

    return items
  }
}
