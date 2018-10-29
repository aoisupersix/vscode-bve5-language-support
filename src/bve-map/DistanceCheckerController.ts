'use strict'

import * as vscode from 'vscode'
import { DistanceChecker } from './DistanceChecker'

/**
 * 距離程チェッカー管理
 */
export class DistanceCheckerController {
  private distChecker: DistanceChecker
  private disposable: vscode.Disposable

  constructor(distChecker: DistanceChecker) {
    this.distChecker = distChecker

    // subscribe to selection change and editor activation events
    const subscriptions: vscode.Disposable[] = []
    vscode.window.onDidChangeTextEditorSelection(
      this._onEvent,
      this,
      subscriptions
    )
    vscode.window.onDidChangeActiveTextEditor(
      this._onEvent,
      this,
      subscriptions
    )

    // update the counter for the current file
    this.distChecker.updateDistance()

    // create a combined disposable from both event subscriptions
    this.disposable = vscode.Disposable.from(...subscriptions)
  }

  public dispose() {
    this.disposable.dispose()
  }

  private _onEvent() {
    this.distChecker.updateDistance()
  }
}
