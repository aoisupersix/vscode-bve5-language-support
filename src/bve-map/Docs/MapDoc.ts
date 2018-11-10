'use strict'

import { List } from 'linqts'
import * as vscode from 'vscode'

import { MapParameter } from './MapParameter'
import { MapSyntax } from './MapSyntax'

/**
 * マップ構文の種類です。
 */
export enum MapSyntaxType {
  /**
   * マップ構文の種類1.
   * [マップ要素.関数();]
   */
  Syntax1,

  /**
   * マップ構文の種類2.
   * [マップ要素[キー].関数();]
   */
  Syntax2,

  /**
   * マップ要素の種類3.
   * [マップ要素1[キー].マップ要素2.関数();]
   */
  Syntax3
}

/**
 * 一種類のマップ構文を格納するクラス
 */
export class MapDoc {
  /**
   * マップ構文
   * 引数が違うものを格納するために配列にしている
   */
  private syntaxes: MapSyntax[] = []

  /**
   * デフォルトのコンストラクタ
   * @param syntaxType マップ構文の種類
   * @param mapElement1Name マップ要素1名
   * @param mapElement2Name マップ要素2名
   * @param funcName 関数名
   * @param document 関数の説明
   * @param params 引数
   */
  constructor(
    syntaxType: MapSyntaxType,
    mapElement1Name: string,
    mapElement2Name: string,
    funcName: string,
    document: vscode.MarkdownString,
    params: MapParameter[]
  ) {
    this.syntaxes.push(
      new MapSyntax(
        syntaxType,
        mapElement1Name,
        mapElement2Name,
        funcName,
        document,
        params
      )
    )
  }

  public addSyntax(document: vscode.MarkdownString, params: MapParameter[]) {
    this.syntaxes.push(
      new MapSyntax(
        this.syntaxes[0].getSyntaxType(),
        this.syntaxes[0].getMapElement1Name(),
        this.syntaxes[0].getMapElement2Name(),
        this.syntaxes[0].getFuncName(),
        document,
        params
      )
    )
  }

  /**
   * 保持している構文シンタックスを返します
   */
  public getSyntaxes(): MapSyntax[] {
    return this.syntaxes
  }

  /**
   * シンタックスのタイプを取得します。
   */
  public getSyntaxType(): MapSyntaxType {
    return this.syntaxes[0].getSyntaxType()
  }

  /**
   * 引数に与えられたらマップ構文のマップ要素1名と一致するか？
   * @param mapElement1Text マップ要素1名
   */
  public isMatchMapElement1(mapElement1Text: string): boolean {
    const type = this.syntaxes[0].getSyntaxType()
    if (type === MapSyntaxType.Syntax1) {
      // シンタックス1はキーがない
      return (
        mapElement1Text.match(
          new RegExp(
            String.raw`^${this.syntaxes[0].getMapElement1Name()}$`,
            'i'
          )
        ) !== null
      )
    } else {
      return (
        mapElement1Text.match(
          new RegExp(
            String.raw`^${this.syntaxes[0].getMapElement1Name()}\[.*\]$`,
            'i'
          )
        ) !== null
      )
    }
  }

  /**
   * 引数に与えられたマップ要素と一致するか？
   * 全てのシンタックスタイプに対応
   * @param mapElementText マップ要素
   */
  public isMatchMapElement(mapElementText: string): boolean {
    const type = this.syntaxes[0].getSyntaxType()
    if (type === MapSyntaxType.Syntax1 || type === MapSyntaxType.Syntax2) {
      // シンタックス1 or 2の場合はマップ要素1のみの結果を返す
      return this.isMatchMapElement1(mapElementText)
    } else if (type === MapSyntaxType.Syntax3) {
      // シンタックス3の場合はマップ要素1 + マップ要素2の結果を返す
      return (
        mapElementText.match(
          new RegExp(
            String.raw`^${this.syntaxes[0].getMapElement1Name()}\[.*\]\.${this.syntaxes[0].getMapElement2Name()}$`,
            'i'
          )
        ) !== null
      )
    }

    return false
  }

  /**
   * 引数に与えられた関数名と一致するか？
   * @param funcName 関数名
   */
  public isMatchFuncName(funcName: string): boolean {
    return (
      funcName.match(
        new RegExp(String.raw`^${this.syntaxes[0].getFuncName()}$`, 'gi')
      ) !== null
    )
  }

  /**
   * 引数に与えられたらマップ構文のシンタックスと一致するか？
   * @param syntaxText マップ構文シンタックス
   */
  public isMatchSyntax(syntaxText: string): boolean {
    switch (this.syntaxes[0].getSyntaxType()) {
      case MapSyntaxType.Syntax1:
        return (
          syntaxText.match(
            new RegExp(
              String.raw`^${this.syntaxes[0].getMapElement1Name()}\.${this.syntaxes[0].getFuncName()}$`,
              'i'
            )
          ) !== null
        )
      case MapSyntaxType.Syntax2:
        return (
          syntaxText.match(
            new RegExp(
              String.raw`^${this.syntaxes[0].getMapElement1Name()}\[.*\]\.${this.syntaxes[0].getFuncName()}$`,
              'i'
            )
          ) !== null
        )
      case MapSyntaxType.Syntax3:
        return (
          syntaxText.match(
            new RegExp(
              String.raw`^${this.syntaxes[0].getMapElement1Name()}\[.*\]\.${this.syntaxes[0].getMapElement2Name()}\.${this.syntaxes[0].getFuncName()}$`,
              'i'
            )
          ) !== null
        )
      default:
        return false
    }
  }

  /**
   * 引数内にストラクチャーキーが含まれているか？
   */
  public hasStructureKeyParams(): boolean {
    const list = new List<MapSyntax>(this.syntaxes)
    return list.Any(s => s!.hasStructureKeyParams())
  }

  /**
   * 引数内にストラクチャーキーが含まれているか？
   */
  public hasTrackKeyParams(): boolean {
    const list = new List<MapSyntax>(this.syntaxes)
    return list.Any(s => s!.hasTrackKeyParams())
  }

  /**
   * 引数に与えられた引数番号はストラクチャーキーの引数番号と一致するか？
   * @param paramNumber 引数番号
   */
  public isMatchStructureKeyParamNumber(paramNumber: number): boolean {
    const list = new List<MapSyntax>(this.syntaxes)
    const numbers = list.SelectMany(s => new List<number>(s.getStructureKeyParamNumbers()))
    return numbers.Any(n => paramNumber === n!)
  }

  /**
   * 引数に与えられた引数番号はトラックキーの引数番号と一致するか？
   * @param paramNumber 引数番号
   */
  public isMatchTrackKeyParamNumber(paramNumber: number): boolean {
    const list = new List<MapSyntax>(this.syntaxes)
    const numbers = list.SelectMany(s => new List<number>(s.getTrackKeyParamNumbers()))
    return numbers.Any(n => paramNumber === n!)
  }

  /**
   * SignatureHelpを取得します。
   */
  public getSignatureHelp(paramIdx: number): vscode.SignatureHelp {
    const ret = new vscode.SignatureHelp()
    const signatures: vscode.SignatureInformation[] = []
    for (const syntax of this.syntaxes) {
      const signature = new vscode.SignatureInformation(
        syntax.getSyntaxDisplayName() + syntax.getParameterDispalyName(),
        syntax.getDocument()
      )
      signature.parameters = syntax.getSignatureParams()
      signatures.push(signature)
    }

    ret.signatures = signatures.sort(
      (a, b) => a.parameters.length - b.parameters.length
    ) // パラメータ数で昇順ソート
    // パラメータ数からシグネチャを選択
    ret.activeSignature = ret.signatures.length - 1
    for (let i = ret.signatures.length - 1; i >= 0; i--) {
      if (paramIdx + 1 <= ret.signatures[i].parameters.length) {
        ret.activeSignature = i
      }
    }

    // アクティブパラメータの設定
    ret.activeParameter = paramIdx
    return ret
  }

  /**
   * マップ要素1のコード補完アイテムを取得します。
   */
  public getMapElement1CompletionItem(): vscode.CompletionItem {
    const item = new vscode.CompletionItem(
      this.syntaxes[0].getMapElement1Name(),
      vscode.CompletionItemKind.Class
    )

    item.detail = this.syntaxes[0].getMapElement1Name();
    item.documentation = new vscode.MarkdownString(`マップ要素：${this.syntaxes[0].getMapElement1Name()}`)
    return item;
  }

  /**
   * マップ要素2のコード補完アイテムを取得します。(シンタックス3のみ)
   */
  public getMapElement2CompletionItem(): vscode.CompletionItem {
    const item = new vscode.CompletionItem(
      this.syntaxes[0].getMapElement2Name(),
      vscode.CompletionItemKind.Class
    )

    item.detail = `${this.syntaxes[0].getMapElement1Name()}.${this.syntaxes[0].getMapElement2Name()}`
    return item;
  }

  /**
   * 関数名のコード補完アイテムを取得します。
   */
  public getFunctionCompletionItem(): vscode.CompletionItem {
    const item = new vscode.CompletionItem(
      this.syntaxes[0].getFuncName(),
      vscode.CompletionItemKind.Function
    )

    item.detail = this.syntaxes[0].getSyntaxDisplayName()
    item.documentation = this.syntaxes[0].getDocument();
    return item;
  }

  /**
   * マップ要素1のホバーを取得します。
   * @param range　ホバー範囲
   */
  public getMapElement1Hover(range: vscode.Range): vscode.Hover {
    return new vscode.Hover(
      [
        new vscode.MarkdownString(
          `マップ要素： ${this.syntaxes[0].getMapElement1Name()}`
        ),
        this.syntaxes[0].getDocument()
      ],
      range
    )
  }

  /**
   * 関数名のホバーを取得します。
   * @param range ホバー範囲
   */
  public getFunctionHover(range: vscode.Range): vscode.Hover {
    return new vscode.Hover(
      [
        new vscode.MarkdownString(`${this.syntaxes[0].getSyntaxDisplayName()}`),
        this.syntaxes[0].getDocument()
      ],
      range
    )
  }
}
