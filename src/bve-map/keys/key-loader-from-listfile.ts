/**
 * リストファイルからキーを読み込むインタフェース
 */
export interface KeyLoaderFromListFile {
  /**
   * リストファイルのヘッダとマッチする正規表現パターン
   */
  listFileHeaderRegex: RegExp

  /**
   * リストファイルのロード構文とマッチする正規表現パターン
   */
  listFileLoadSyntaxRegex: RegExp

  /**
   * 現在格納されているキーをすべて削除します。
   */
  clearKey(): void

  /**
   * キーをファイルパスから取得して追加します。
   * @param listFileText リストファイル文字列
   */
  addKeys(listFileText: string): void
}
