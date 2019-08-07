/**
 * マップ構文からキーを読み込むインタフェース
 */
export interface IKeyLoaderFromMapSyntax {
    /**
     * 現在格納されているキーをすべて削除します。
     */
    clearKey(): void

    /**
     * 現在格納されているキーを配列で返します。
     */
    getKeys(): any[]

    /**
     * キーをマップ構文から取得して追加します。
     * @param mapText マップ構文
     */
    addKeys(mapText: string): void
}
