'use strict'

import * as vscode from 'vscode'

import { StructureKeys } from '../../bve-structures/StructureKeys';
import * as headers from '../../const/headers'
import * as loadSyntaxes from '../../const/syntaxes'
import * as util from '../../util'

/**
 * リストファイルの読み込みを行います。
 */
export class ListFileLoader {

  constructor(private structureKeys: StructureKeys) {

  }

  /**
   * ファイルを読み込みます。
   */
  public loadFiles() {
    // 初期化
    this.structureKeys.clearKey()

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
   * @param data マップ構文
   */
  public loadFilesFromSyntax(data: string, currentPath: string) {

    // ストラクチャーリスト
    const structureListPath = this.getListFilePath(data, loadSyntaxes.LOAD_STRUCTURE, currentPath);
    if (structureListPath !== null) {
      const strList = util.loadFile(structureListPath);
      this.structureKeys.addKeys(strList);
    }
    return null
  }

  /**
   * リストファイルをワークスペースのテキストから取得します。
   */
  public loadFilesFromWorkspace() {
    vscode.workspace.findFiles('**/*.{txt,csv}').then(files => {
      for (const file of files) {
        const txt = util.loadFile(file.fsPath)
        const header = txt.split(/[\n\r]/)[0]

        if (header.match(headers.STRUCTURES_HEADER)) {
          // ストラクチャーリスト追加
          this.structureKeys.addKeys(txt)
        }
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
