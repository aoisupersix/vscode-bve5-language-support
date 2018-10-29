'use strict'

import * as csvSync from 'csv-parse/lib/sync'
import { List } from 'linqts'

import * as headers from '../const/headers'
import { trimWhiteSpace } from '../util'

/**
 * ストラクチャーキークラス
 */
export class StructureKeys {
  /**
   * インスタンス
   */
  private static instance: StructureKeys

  private keyList: List<string[]> = new List<string[]>()

  public get KeyList() {
    return this.keyList
  }

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
   * 引数に与えられたストラクチャーリストファイルからキーを取得しますして追加します。
   * @param data ストラクチャーリストファイル
   */
  public addKeys(data: string) {
    data = trimWhiteSpace(data, headers.STRUCTURES_HEADER)
    const matrix = csvSync(data)

    const keyList = new List<string[]>(matrix)
    this.keyList = keyList.Where(k => k !== undefined && k.length === 2)
  }
}
