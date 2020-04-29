import * as Enumerable from 'linq'
import * as vscode from 'vscode'

import { DistanceChecker } from './distance-checker/distance-checker'
import { KeyLoaderFromMapSyntax } from './keys/key-loader-from-mapsyntax'
import { ListFileLoader } from './keys/listfile-loader'

/**
 * bve-mapのイベント管理
 */
export class MapController {
  private disposable: vscode.Disposable
  private keys: Enumerable.IEnumerable<KeyLoaderFromMapSyntax>

  constructor(
    private distChecker: DistanceChecker,
    private listFileLoader: ListFileLoader,
    ...keys: KeyLoaderFromMapSyntax[]
  ) {
    const subscriptions: vscode.Disposable[] = []
    this.keys = Enumerable.from(keys)

    // DistanceCheckerのイベント登録
    vscode.window.onDidChangeTextEditorSelection(
      this.updateDistance,
      this,
      subscriptions
    )
    vscode.window.onDidChangeActiveTextEditor(
      this.updateDistance,
      this,
      subscriptions
    )

    // ListFileLoaderのイベント登録
    vscode.workspace.onDidChangeConfiguration(
      this.loadListFiles,
      this,
      subscriptions
    )
    vscode.workspace.onDidSaveTextDocument(
      this.loadListFiles,
      this,
      subscriptions
    )
    vscode.workspace.onDidChangeWorkspaceFolders(
      this.loadListFiles,
      this,
      subscriptions
    )

    vscode.workspace.onDidChangeTextDocument(this.loadKeys, this, subscriptions)

    // 初期化
    this.distChecker.updateDistance()
    this.listFileLoader.loadFiles()

    this.disposable = vscode.Disposable.from(...subscriptions)
  }

  public dispose(): void {
    this.disposable.dispose()
  }

  private updateDistance(): void {
    this.distChecker.updateDistance()
  }

  private loadListFiles(): void {
    this.listFileLoader.loadFiles()
  }

  private loadKeys(): void {
    const editor = vscode.window.activeTextEditor
    if (editor !== undefined) {
      this.keys.forEach((k) => {
        k.clearKey()
        k.addKeys(editor.document.getText())
      })
    }
  }
}
