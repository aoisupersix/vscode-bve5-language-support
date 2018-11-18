'use strict'

import * as vscode from 'vscode'

import { DistanceChecker } from './DistanceChecker/DistanceChecker'
import { ListFileLoader } from './ListFileLoader';


/**
 * bve-mapのイベント管理
 */
export class MapController {
  private disposable: vscode.Disposable

  constructor(private distChecker: DistanceChecker, private listFileLoader: ListFileLoader) {
    const subscriptions: vscode.Disposable[] = []

    // DistanceCheckerのイベント登録
    vscode.window.onDidChangeTextEditorSelection(this._updateDistance, this, subscriptions)
    vscode.window.onDidChangeActiveTextEditor(this._updateDistance, this, subscriptions)

    // ListFileLoaderのイベント登録
    vscode.workspace.onDidChangeConfiguration(this._loadListFiles, this, subscriptions)
    vscode.workspace.onDidSaveTextDocument(this._loadListFiles, this, subscriptions)

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
}
