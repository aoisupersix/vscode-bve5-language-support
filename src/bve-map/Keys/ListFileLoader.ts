'use strict'

import { List } from 'linqts'
import * as vscode from 'vscode'

import * as util from '../../util'
import { IKeyLoaderFromListFile } from './IKeyLoaderFromListFile';

/**
 * リストファイルの読み込みを行います。
 */
export class ListFileLoader {

  private keys: List<IKeyLoaderFromListFile>

  constructor(... lists: IKeyLoaderFromListFile[]) {
    this.keys = new List(lists)
  }

  /**
   * ファイルを読み込みます。
   */
  public loadFiles() {
    // 初期化
    this.keys.ForEach(k => k!.clearKey())

    const rootPath = vscode.workspace.rootPath
    if (rootPath === undefined) {

      const editor = vscode.window.activeTextEditor;
      if (editor !== undefined) {
        this.loadFilesFromSyntax(editor.document.getText(), editor.document.fileName)
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
  public loadFilesFromSyntax(mapText: string, currentPath: string) {

    const lists = this.keys.Select(k => {
      const ret = { key: k, filePath: this.getListFilePath(mapText, k.listFileLoadSyntaxRegex, currentPath)}
      return ret
    }).Where(k => k!.filePath !== null)
    
    // 読み込み
    lists.ForEach(k => {
      const listFileText = util.loadFile(k!.filePath!)
      k!.key!.addKeys(listFileText)
    })
  }

  /**
   * リストファイルをワークスペースのテキストから取得します。
   */
  public loadFilesFromWorkspace() {
    vscode.workspace.findFiles('**/*.{txt,csv}').then(files => {
      for (const file of files) {
        const txt = util.loadFile(file.fsPath)
        const header = txt.split(/[\n\r]/)[0]

        this.keys
          .Where(k => header.match(k!.listFileHeaderRegex) !== null)
          .ForEach(k => k!.addKeys(txt))
      }
    })
  }

  /**
   * 引数に与えられたマップ構文とロード構文の種類からロードするリストファイルの絶対パスを取得します。
   * @param data マップ構文
   * @param loadSyntaxRegex ロード構文の種類（const/loadSyntaxesから取ってくる)
   * @param currentPath 現在のファイルパス
   */
  private getListFilePath(data: string, loadSyntaxRegex: RegExp, currentPath: string): string | null {
    const match = loadSyntaxRegex.exec(data);
    if (match !== null) {
      const val = match[1];
      if (val !== undefined) {
        const path = util.getAbsoluteFilePath(currentPath, val)
        if (path !== undefined) {
          return path;
        }
      }
    }

    return null;
  }
}
