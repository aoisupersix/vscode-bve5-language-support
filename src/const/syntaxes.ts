
/**
 * 行コメントを示すデフォルトの正規表現パターンです。
 */
export const COMMENT: RegExp = /#|\/\//

/**
 * Structure.Load構文の正規表現パターン
 * ファイルパスをキャプチャします。
 */
export const LOAD_STRUCTURE = /Structure\s*\.\s*Load\((?:\'|")?(.+?)(?:\'|")?\)\s*;/gi