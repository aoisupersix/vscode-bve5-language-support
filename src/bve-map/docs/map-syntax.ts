import * as Enumerable from 'linq'
import * as vscode from 'vscode'

import { MapSyntaxType } from './mapdoc'
import { MapParameter } from './map-parameter'

/**
 * 一つのマップ構文を格納するクラス
 */
export class MapSyntax {
  /**
   * デフォルトのコンストラクタ
   * @param syntaxType マップ構文の種類
   * @param mapElement1Name マップ要素1名
   * @param mapElement2Name マップ要素2名
   * @param funcName 関数名
   * @param document 関数の説明
   */
  constructor(
    private syntaxType: MapSyntaxType,
    private mapElement1Name: string,
    private mapElement2Name: string,
    private funcName: string,
    private document: vscode.MarkdownString,
    private params: MapParameter[]
  ) {}

  /**
   * マップ構文の種類を取得します。
   */
  public getSyntaxType(): MapSyntaxType {
    return this.syntaxType
  }

  /**
   * マップ要素1名を取得します。
   */
  public getMapElement1Name(): string {
    return this.mapElement1Name
  }

  /**
   * マップ要素2名を取得します。
   */
  public getMapElement2Name(): string {
    return this.mapElement2Name
  }

  /**
   * 関数名を取得します。
   */
  public getFuncName(): string {
    return this.funcName
  }

  /**
   * 引数にストラクチャーキーが含まれているか？
   */
  public hasStructureKeyParams(): boolean {
    const list = Enumerable.from(this.params)
    return list.any((p) => p.isStructureKey)
  }

  /**
   * 引数内にトラックキーが含まれているか？
   */
  public hasTrackKeyParams(): boolean {
    const list = Enumerable.from(this.params)
    return list.any((p) => p.isTrackKey)
  }

  /**
   * ストラクチャーキーの引数番号を取得して返します。
   */
  public getStructureKeyParamNumbers(): number[] {
    const numbers: number[] = []
    for (let i = 0; i < this.params.length; i += 1) {
      if (this.params[i].isStructureKey) {
        numbers.push(i)
      }
    }

    return numbers
  }

  /**
   * トラックキーの引数番号を取得して返します。
   */
  public getTrackKeyParamNumbers(): number[] {
    const numbers: number[] = []
    for (let i = 0; i < this.params.length; i += 1) {
      if (this.params[i].isTrackKey) {
        numbers.push(i)
      }
    }

    return numbers
  }

  /**
   * 関数の説明を取得します。
   */
  public getDocument(): vscode.MarkdownString {
    return this.document
  }

  /**
   * 構文の表示名を取得します。
   */
  public getSyntaxDisplayName(): string {
    let displayName = ''
    switch (this.syntaxType) {
      case MapSyntaxType.Syntax1:
        displayName += `${this.mapElement1Name}.${this.funcName}`
        break
      case MapSyntaxType.Syntax2:
        displayName += `${this.mapElement1Name}.${this.funcName}`
        break
      case MapSyntaxType.Syntax3:
        displayName += `${this.mapElement1Name}.${this.mapElement2Name}.${this.funcName}`
        break
    }

    return displayName
  }

  /**
   * 引数の表示名を取得します。
   */
  public getParameterDispalyName(): string {
    let displayName = ''

    // 引数の追加
    displayName += '('
    if (this.params.length > 0) {
      for (const param of this.params) {
        displayName += `${param.name}, `
      }
      displayName = displayName.substring(0, displayName.length - 2) // 最後のコンマは消す
    }
    displayName += ')'

    return displayName
  }

  /**
   * ParameterInfomationの配列を取得します。
   */
  public getSignatureParams(): vscode.ParameterInformation[] {
    const paramInfos: vscode.ParameterInformation[] = []
    for (const param of this.params) {
      paramInfos.push(param.getParameterInfo())
    }
    return paramInfos
  }
}
