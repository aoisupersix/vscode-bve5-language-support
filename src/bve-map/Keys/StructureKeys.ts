'use strict'

import * as csvSync from 'csv-parse/lib/sync'
import { List } from 'linqts'
import * as vscode from 'vscode'

import * as headers from '../../const/headers'
import * as loadSyntaxes from '../../const/syntaxes'
import { trimWhiteSpace } from '../../util'
import { MapDoc } from '../Docs/MapDoc'
import { IKeyList } from './IKeyList';
import { IKeyLoaderFromListFile } from './IKeyLoaderFromListFile';

/**
 * ストラクチャーキークラス
 */
export class StructureKeys implements IKeyList, IKeyLoaderFromListFile {

  /**
   * リストファイルのヘッダとマッチする正規表現パターン
   */
  public listFileHeaderRegex: RegExp = headers.STRUCTURES_HEADER

  /**
   * リストファイルのロード構文とマッチする正規表現パターン
   */
  public listFileLoadSyntaxRegex: RegExp = loadSyntaxes.LOAD_STRUCTURE

  private keyList: List<string[]> = new List<string[]>()

  /**
   * 現在格納されているキーをすべて削除します。
   */
  public clearKey() {
    this.keyList = new List<string[]>()
  }

  /**
   * 引数に与えられたストラクチャーリスト構文からキーを取得して格納します。
   * @param mapText ストラクチャーリスト構文
   */
  public addKeys(structureListText: string) {
    const csvText = trimWhiteSpace(structureListText, headers.STRUCTURES_HEADER)
    const matrix = csvSync(csvText)

    const keyList = new List<string[]>(matrix)
    this.keyList = keyList.Where(k => k !== undefined && k.length === 2)
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
      const item = new vscode.CompletionItem(k[0], vscode.CompletionItemKind.Keyword)
      item.detail = k[1]
      item.documentation = "ストラクチャー"
      return item
    }).ToArray()

    return items
  }

  /**
   * 引数に与えられた構文のキー種別が一致するか？
   * @param functionName 構文名
   */
  public isMatchFunctionKey(functionName: string): boolean {
    return functionName.match(/Structure/i) !== null
  }

  /**
   * 引数に与えられた構文の引数がキー種別と一致するか？
   * @param syntaxes 探索対象の構文
   * @param syntaxName 構文名
   * @param paramCount 引数番号（何番目の引数か？）
   */
  public isMatchArgumentKey(syntaxes: MapDoc[], syntaxName: string, paramCount: number): boolean {
    const syntaxList = new List<MapDoc>(syntaxes)
    const strKeySyntaxList = syntaxList
    .Where(m => m!.hasStructureKeyParams())
    .Where(m => m!.isMatchSyntax(syntaxName))
    .Where(m => m!.isMatchStructureKeyParamNumber(paramCount))

    return strKeySyntaxList.Any()
  }
}