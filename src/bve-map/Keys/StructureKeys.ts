import * as csvSync from 'csv-parse/lib/sync'
import * as Enumerable from 'linq'
import * as vscode from 'vscode'

import * as headers from '../../const/headers'
import * as loadSyntaxes from '../../const/syntaxes'
import { trimWhiteSpace } from '../../util'
import { MapDoc } from '../Docs/MapDoc'
import { KeyList } from './IKeyList'
import { KeyLoaderFromListFile } from './IKeyLoaderFromListFile'

/**
 * ストラクチャーキークラス
 */
export class StructureKeys implements KeyList, KeyLoaderFromListFile {
  /**
   * リストファイルのヘッダとマッチする正規表現パターン
   */
  public listFileHeaderRegex: RegExp = headers.STRUCTURES_HEADER

  /**
   * リストファイルのロード構文とマッチする正規表現パターン
   */
  public listFileLoadSyntaxRegex: RegExp = loadSyntaxes.LOAD_STRUCTURE

  private keyList: string[][] = []

  /**
   * 現在格納されているキーをすべて削除します。
   */
  public clearKey(): void {
    this.keyList = []
  }

  /**
   * 引数に与えられたストラクチャーリスト構文からキーを取得して格納します。
   * @param mapText ストラクチャーリスト構文
   */
  public addKeys(structureListText: string): void {
    const csvText = trimWhiteSpace(structureListText, headers.STRUCTURES_HEADER)
    const matrix = csvSync(csvText)

    const keyList = matrix as string[][]
    this.keyList = keyList.filter((k) => k !== undefined && k.length === 2)
  }

  /**
   * 現在格納されているキーのCompletionItemを返します。
   */
  public getCompletionItems(): vscode.CompletionItem[] {
    const items = this.keyList.map((k) => {
      const item = new vscode.CompletionItem(
        k[0],
        vscode.CompletionItemKind.Keyword
      )
      item.detail = k[1]
      item.documentation = 'ストラクチャー'
      return item
    })

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
  public isMatchArgumentKey(
    syntaxes: MapDoc[],
    syntaxName: string,
    paramCount: number
  ): boolean {
    const syntaxList = Enumerable.from(syntaxes)
    const strKeySyntaxList = syntaxList
      .where((m) => m.hasStructureKeyParams())
      .where((m) => m.isMatchSyntax(syntaxName))
      .where((m) => m.isMatchStructureKeyParamNumber(paramCount))

    return strKeySyntaxList.any()
  }
}
