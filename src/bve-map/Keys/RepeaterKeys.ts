'use strict'

import { List } from 'linqts'
import * as vscode from 'vscode'

import * as headers from '../../const/headers'
import { COMMENT } from '../../const/syntaxes';
import { trimWhiteSpace } from '../../util'
import { MapDoc } from '../Docs/MapDoc'
import { IKeyList } from './IKeyList';

/**
 * 連続ストラクチャーキークラス
 */
export class RepeaterKeys implements IKeyList {

  private keyList: List<string> = new List<string>()

  /**
   * 現在格納されているキーをすべて削除します。
   */
  public clearKey() {
    this.keyList = new List<string>()
  }

  /**
   * 引数に与えられたマップ構文からキーを取得して格納します。
   * @param mapText マップ構文
   */
  public addKeys(mapText: string) {
    const trimedMapText = trimWhiteSpace(mapText, headers.MAP_HEADER, COMMENT, true)
    const repeaterRegex = /Repeater\['(.+)'\]/i
    const keys = new List<string>(trimedMapText.split(';'))
      .Select(t => repeaterRegex.exec(t))
      .Where(r => r !== null)
      .Select(r => r![1])
      .Distinct()
    this.keyList.AddRange(keys.ToArray())
  }

  /**
   * 現在格納されているキーを配列で返します。
   */
  public getKeys(): any[] {
    return this.keyList.ToArray()
  }

  /**
   * 現在格納されているキーのCompletionItemを返します。
   */
  public getCompletionItems(): vscode.CompletionItem[] {
    const items = this.keyList.Select(k => {
      const item = new vscode.CompletionItem(k, vscode.CompletionItemKind.Keyword)
      item.detail = k
      item.documentation = "連続ストラクチャー"
      return item
    }).ToArray()

    return items
  }

  /**
   * 引数に与えられた構文のキー種別が一致するか？
   * @param functionName 構文名
   */
  public isMatchFunctionKey(functionName: string): boolean {
    return functionName.match(/Repeater/i) !== null
  }

  /**
   * 引数に与えられた構文の引数がキー種別と一致するか？
   * @param syntaxes 探索対象の構文
   * @param syntaxName 構文名
   * @param paramCount 引数番号（何番目の引数か？）
   */
  public isMatchArgumentKey(syntaxes: MapDoc[], syntaxName: string, paramCount: number): boolean {
    // 該当なし
    return false
  }
}