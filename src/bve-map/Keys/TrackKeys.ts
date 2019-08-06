import * as Enumerable from 'linq'
import * as vscode from 'vscode'

import * as headers from '../../const/headers'
import { COMMENT } from '../../const/syntaxes'
import { trimWhiteSpace } from '../../util'
import { MapDoc } from '../Docs/MapDoc'
import { IKeyList } from './IKeyList'
import { IKeyLoaderFromMapSyntax } from './IKeyLoaderFromMapSyntax'

/**
 * トラックキークラス
 */
export class TrackKeys implements IKeyList, IKeyLoaderFromMapSyntax {
    private keyList: Enumerable.IEnumerable<string> = Enumerable.empty()

    /**
     * 現在格納されているキーをすべて削除します。
     */
    public clearKey() {
        this.keyList = Enumerable.empty()
    }

    /**
     * 引数に与えられたマップ構文からキーを取得して格納します。
     * @param mapText マップ構文
     */
    public addKeys(mapText: string) {
        const trimedMapText = trimWhiteSpace(mapText, headers.MAP_HEADER, COMMENT, true)
        const trackRegex = /Track\['(.+)'\]/i
        const keys = Enumerable.from(trimedMapText.split(';'))
            .select(t => trackRegex.exec(t))
            .where(r => r !== null)
            .select(r => r![1])
            .distinct()
        this.keyList = this.keyList.concat(keys.toArray())
    }

    /**
     * 現在格納されているキーを配列で返します。
     */
    public getKeys(): any[] {
        return this.keyList.toArray()
    }

    /**
     * 現在格納されているキーのCompletionItemを返します。
     */
    public getCompletionItems(): vscode.CompletionItem[] {
        const items = this.keyList
            .select(k => {
                const item = new vscode.CompletionItem(k, vscode.CompletionItemKind.Keyword)
                item.detail = k
                item.documentation = 'トラック'
                return item
            })
            .toArray()

        return items
    }

    /**
     * 引数に与えられた構文のキー種別が一致するか？
     * @param functionName 構文名
     */
    public isMatchFunctionKey(functionName: string): boolean {
        return functionName.match(/Track/i) !== null
    }

    /**
     * 引数に与えられた構文の引数がキー種別と一致するか？
     * @param syntaxes 探索対象の構文
     * @param syntaxName 構文名
     * @param paramCount 引数番号（何番目の引数か？）
     */
    public isMatchArgumentKey(syntaxes: MapDoc[], syntaxName: string, paramCount: number): boolean {
        const syntaxList = Enumerable.from(syntaxes)
        const trackKeySyntaxList = syntaxList
            .where(m => m!.hasTrackKeyParams())
            .where(m => m!.isMatchSyntax(syntaxName))
            .where(m => m!.isMatchTrackKeyParamNumber(paramCount))

        return trackKeySyntaxList.any()
    }
}
