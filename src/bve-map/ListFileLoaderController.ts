'use strict'

import * as vscode from 'vscode'
import { ListFileLoader } from './ListFileLoader'

export class ListFileLoaderController {
  private listFileLoader: ListFileLoader
  private disposable: vscode.Disposable

  constructor() {
    // subscribe to selection change and editor activation events
    const subscriptions: vscode.Disposable[] = []
    vscode.workspace.onDidChangeConfiguration(
      this._onEvent,
      this,
      subscriptions
    )
    vscode.workspace.onDidSaveTextDocument(this._onEvent, this, subscriptions)

    // update the counter for the current file
    this.listFileLoader = new ListFileLoader()
    this.listFileLoader.loadFiles()

    // create a combined disposable from both event subscriptions
    this.disposable = vscode.Disposable.from(...subscriptions)
  }

  public dispose() {
    this.disposable.dispose()
  }

  private _onEvent() {
    this.listFileLoader.loadFiles()
  }
}
