/**
 * マップ構文からキーを読み込むインタフェース
 */
export interface KeyLoaderFromMapSyntax {
  /**
   * 現在格納されているキーをすべて削除します。
   */
  clearKey(): void

  /**
   * キーをマップ構文から取得して追加します。
   * @param mapText マップ構文
   */
  addKeys(mapText: string): void
}
