'use strict';

import * as vscode from 'vscode';
import * as util from '../util';

export class ListFileLoaderController {

  private _listFileLoader: ListFileLoader = new ListFileLoader();
  private _disposable: vscode.Disposable;

  constructor() {

      // subscribe to selection change and editor activation events
      let subscriptions: vscode.Disposable[] = [];
      vscode.workspace.onDidChangeConfiguration(this._onEvent, this, subscriptions);
      vscode.workspace.onDidSaveTextDocument(this._onEvent, this, subscriptions);

      // update the counter for the current file
      this._listFileLoader.loadFiles();

      // create a combined disposable from both event subscriptions
      this._disposable = vscode.Disposable.from(...subscriptions);
  }

  dispose() {
      this._disposable.dispose();
  }

  private _onEvent() {
      this._listFileLoader.loadFiles();
  }
}

export class ListFileLoader {

  public loadFiles() {

  }
}