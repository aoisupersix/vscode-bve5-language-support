'use strict'

import * as vscode from 'vscode'
import * as util from '../util'
import { StructureKeys } from '../bve-structures/StructureKeys'

export class ListFileLoaderController {
  private _listFileLoader: ListFileLoader
  private _disposable: vscode.Disposable

  constructor() {
    // subscribe to selection change and editor activation events
    let subscriptions: vscode.Disposable[] = []
    vscode.workspace.onDidChangeConfiguration(
      this._onEvent,
      this,
      subscriptions
    )
    vscode.workspace.onDidSaveTextDocument(this._onEvent, this, subscriptions)

    // update the counter for the current file
    this._listFileLoader = new ListFileLoader()
    this._listFileLoader.loadFiles()

    // create a combined disposable from both event subscriptions
    this._disposable = vscode.Disposable.from(...subscriptions)
  }

  dispose() {
    this._disposable.dispose()
  }

  private _onEvent() {
    this._listFileLoader.loadFiles()
  }
}

export class ListFileLoader {
  loadFiles() {
    // 初期化
    StructureKeys.instance.clearKey()

    const rootPath = vscode.workspace.rootPath
    if (rootPath === undefined) {
      this.loadFilesFromSyntax()
    } else {
      this.loadFilesFromWorkspace()
    }
  }

  /**
   * リストファイルを構文から取得します。
   */
  loadFilesFromSyntax() {}

  /**
   * リストファイルをワークスペースのテキストから取得します。
   */
  loadFilesFromWorkspace() {
    vscode.workspace.findFiles('**/*.{txt,csv}').then(
      files => {
        for (const i in files) {
          const txt = util.loadFile(files[i].fsPath)
          const header = txt.split(/[\n\r]/)[0]
          
          if (header.match(/^\s*BveTs\s*Structure\s*List\s*\d+\.\d+\s*(?::.*)?\s*(?:$|\r\n|\n|\r)/gi)) {
            //ストラクチャーリスト追加
            StructureKeys.instance.addKeys(txt)
          }
          console.log(txt)
        }
      },
      reason => {
        console.log(reason)
      }
    )
  }
}
