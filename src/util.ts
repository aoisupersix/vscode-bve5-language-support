'use strict'

import * as encoding from 'encoding-japanese'
import * as fs from 'fs'
import * as iconv from 'iconv-lite'

import * as headers from './const/headers';

/**
 * 行コメントを示すデフォルトの正規表現パターンです。
 */
export const COMMENT_REGEX: RegExp = /#|\/\//

/**
 * 引数に与えられたMap構文から不要な部分を削除します。
 * @param mapTextData 未整形のマップファイルテキスト
 */
export function trimMapText(mapTextData: string): string {
  return trimWhiteSpace(mapTextData, headers.MAP_HEADER, COMMENT_REGEX, true);
}

/**
 * 引数に与えられた構文からWhiteSpaceを削除します。
 * @param data 除去対象の構文文字列
 * @param headerRegex ファイルヘッダの正規表現(Optional)
 * @param commentRegex コメントトークンの正規表現(Optional)
 * @param isDeleteNewLine 改行を削除するか？(Optional)
 */
export function trimWhiteSpace(
  data: string,
  headerRegex?: RegExp,
  commentRegex: RegExp = COMMENT_REGEX,
  isDeleteNewLine?: boolean
): string {
  // ヘッダの削除
  if (headerRegex !== undefined) {
    data = data.replace(headerRegex, '')
  }

  // WhiteSpaceの削除
  const lines = data.split(/[\n\r]/)
  let ret = ''
  for (let line of lines) {
    const commentIdx = line.search(commentRegex)
    if (commentIdx !== -1) {
      line = line.substring(0, commentIdx)
    }
    line = line.replace(/\s+/g, '')

    // 空行は飛ばす
    if (line !== '') {
      ret += line

      // 改行の追加
      if (isDeleteNewLine === undefined || isDeleteNewLine === false) {
        ret += '\n'
      }
    }
  }
  return ret
}

/**
 * 引数に与えられたファイルパスのファイルを読み込みます。
 * @param filePath ファイルパス
 */
export function loadFile(filePath: string): string {
  const buf = fs.readFileSync(filePath)
  const encode = encoding.detect(buf)
  return iconv.decode(buf, encode)
}
