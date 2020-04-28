import * as vscode from 'vscode'

import * as util from '../../util'
import { KeyLoaderFromListFile } from './IKeyLoaderFromListFile'

/**
 * リストファイルの読み込みを行います。
 */
export class ListFileLoader {
  private keys: KeyLoaderFromListFile[]

  constructor(...lists: KeyLoaderFromListFile[]) {
    this.keys = lists
  }

  /**
   * ファイルを読み込みます。
   */
  public loadFiles(): void {
    // 初期化
    this.keys.forEach((k) => k.clearKey())

    const rootPath = vscode.workspace.rootPath
    if (rootPath === undefined) {
      const editor = vscode.window.activeTextEditor
      if (editor !== undefined) {
        this.loadFilesFromSyntax(
          editor.document.getText(),
          editor.document.fileName
        )
      }
    } else if (rootPath !== undefined) {
      this.loadFilesFromWorkspace()
    }
  }

  /**
   * リストファイルを構文から取得します。
   * @param mapText マップ構文
   * @param currentPath 現在のディレクトリパス
   */
  public loadFilesFromSyntax(mapText: string, currentPath: string): void {
    const lists = this.keys
      .map((k) => {
        const ret = {
          key: k,
          filePath: this.getListFilePath(
            mapText,
            k.listFileLoadSyntaxRegex,
            currentPath
          ),
        }
        return ret
      })
      .filter((k) => k.filePath !== null)

    // 読み込み
    lists.forEach((k) => {
      const listFileText = util.loadFile(k.filePath)
      k.key.addKeys(listFileText)
    })
  }

  /**
   * リストファイルをワークスペースのテキストから取得します。
   */
  public loadFilesFromWorkspace(): void {
    vscode.workspace.findFiles('**/*.{txt,csv}').then((files) => {
      for (const file of files) {
        const txt = util.loadFile(file.fsPath)
        const header = txt.split(/[\n\r]/)[0]

        this.keys
          .filter((k) => header.match(k.listFileHeaderRegex) !== null)
          .forEach((k) => k.addKeys(txt))
      }
    })
  }

  /**
   * 引数に与えられたマップ構文とロード構文の種類からロードするリストファイルの絶対パスを取得します。
   * @param data マップ構文
   * @param loadSyntaxRegex ロード構文の種類（const/loadSyntaxesから取ってくる)
   * @param currentPath 現在のファイルパス
   */
  private getListFilePath(
    data: string,
    loadSyntaxRegex: RegExp,
    currentPath: string
  ): string | null {
    const match = loadSyntaxRegex.exec(data)
    if (match !== null) {
      const val = match[1]
      if (val !== undefined) {
        const path = util.getAbsoluteFilePath(currentPath, val)
        if (path !== undefined) {
          return path
        }
      }
    }

    return null
  }
}
