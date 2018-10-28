'use strict';

import * as vscode from 'vscode';
import * as util from '../util';

export class ListFileLoaderController {

  private _listFileLoader: ListFileLoader;
  private _disposable: vscode.Disposable;

  constructor() {

      // subscribe to selection change and editor activation events
      let subscriptions: vscode.Disposable[] = [];
      vscode.workspace.onDidChangeConfiguration(this._onEvent, this, subscriptions);
      vscode.workspace.onDidSaveTextDocument(this._onEvent, this, subscriptions);

      // update the counter for the current file
      this._listFileLoader = new ListFileLoader();
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

  loadFiles() {
      vscode.workspace.findFiles('**/*.{txt,csv}').then((files) => {
        for(const i in files) {
            const txt = util.loadFile(files[i].fsPath);
            console.log(txt);
        }
      }, (reason) => {
        console.log(reason);
      });

  }
}