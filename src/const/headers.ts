
/**
 * マップファイルのヘッダー正規表現パターン
 */
export const MAP_HEADER: RegExp = /^\s*BveTs\s*Map\s*\d+\.\d+\s*(?::.*)?\s*(?:$|\r\n|\n|\r)/gi

/**
 * ストラクチャーファイルのヘッダー正規表現パターン
 */
export const STRUCTURES_HEADER: RegExp = /^\s*BveTs\s*Structure\s*List\s*\d+\.\d+\s*(?::.*)?\s*(?:$|\r\n|\n|\r)/gi