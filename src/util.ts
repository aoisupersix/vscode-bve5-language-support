'use strict'

import * as encoding from 'encoding-japanese'
import * as fs from 'fs'
import * as iconv from 'iconv-lite'
import * as path from 'path'

import * as headers from './const/headers';
import { COMMENT } from './const/syntaxes';



/**
 * 引数に与えられたMap構文から不要な部分を削除します。
 * @param mapTextData 未整形のマップファイルテキスト
 */
export function trimMapText(mapTextData: string): string {
  return trimWhiteSpace(mapTextData, headers.MAP_HEADER, COMMENT, true);
}

/**
 * 引数に与えられた構文からWhiteSpaceを削除します。
 * @param data 除去対象の構文文字列
 * @param headerRegex ファイルヘッダの正規表現(Optional)
 * @param commentRegex コメントトークンの正規表現(Optional) 引数を指定しない場合は[#|//]になります。
 * @param isDeleteNewLine 改行を削除するか？(Optional)
 */
export function trimWhiteSpace(
  data: string,
  headerRegex?: RegExp,
  commentRegex: RegExp = COMMENT,
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
 * 引数に与えられた相対パスから絶対パスを取得します。
 * @param currentFilePath 現在のファイルパス
 * @param relativeFilePath 取得する対象ファイルの相対ファイル
 */
export function getAbsoluteFilePath(currentFilePath: string, relativeFilePath: string) {
  const currentDir = path.dirname(currentFilePath)
  const absolutePath = path.resolve(currentDir, relativeFilePath)
  
  if (isExistsFile(absolutePath)) {
    return absolutePath;
  }

  return undefined;
}

/**
 * 引数に与えられたファイルパスが存在するか確認します。
 * @param filePath ファイルパス
 */
export function isExistsFile(filePath: string) {
  try {
    fs.statSync(filePath);
    return true
  } catch(err) {
    if(err.code === 'ENOENT') { return false }
  }
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
