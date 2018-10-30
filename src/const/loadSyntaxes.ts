
/**
 * Structure.Load構文の正規表現パターン
 * ファイルパスをキャプチャします。
 */
export const LOAD_STRUCTURE = /Structure\s*\.\s*Load\((?:\'|")?(.+?)(?:\'|")?\)\s*;/gi