'use strict'

import { List } from 'linqts'
import * as vscode from 'vscode'

import { DistanceChecker } from './DistanceChecker/DistanceChecker'
import { IKeyLoaderFromMapSyntax } from './Keys/IKeyLoaderFromMapSyntax'
import { ListFileLoader } from './Keys/ListFileLoader'


/**
 * bve-mapのイベント管理
 */
export class MapController {
  private disposable: vscode.Disposable
  private keys: List<IKeyLoaderFromMapSyntax>

  constructor(private distChecker: DistanceChecker, private listFileLoader: ListFileLoader, ... keys: IKeyLoaderFromMapSyntax[]) {
    const subscriptions: vscode.Disposable[] = []
    this.keys = new List(keys)

    // DistanceCheckerのイベント登録
    vscode.window.onDidChangeTextEditorSelection(this._updateDistance, this, subscriptions)
    vscode.window.onDidChangeActiveTextEditor(this._updateDistance, this, subscriptions)

    // ListFileLoaderのイベント登録
    vscode.workspace.onDidChangeConfiguration(this._loadListFiles, this, subscriptions)
    vscode.workspace.onDidSaveTextDocument(this._loadListFiles, this, subscriptions)
    vscode.workspace.onDidChangeWorkspaceFolders(this._loadListFiles, this, subscriptions)

    vscode.workspace.onDidChangeTextDocument(this._loadKeys, this, subscriptions)

    // 初期化
    this.distChecker.updateDistance()
    this.listFileLoader.loadFiles()

    this.disposable = vscode.Disposable.from(...subscriptions)
  }

  public dispose() {
    this.disposable.dispose()
  }

  private _updateDistance() {
    this.distChecker.updateDistance()
  }

  private _loadListFiles() {
    this.listFileLoader.loadFiles()
  }

  private _loadKeys() {
    const editor = vscode.window.activeTextEditor;
    if (editor !== undefined) {
      this.keys.ForEach(k => {
        k!.clearKey()
        k!.addKeys(editor.document.getText())
      })
    }
  }
}
