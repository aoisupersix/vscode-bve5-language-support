import * as Enumerable from 'linq'
import * as vscode from 'vscode'

import { DistanceChecker } from './DistanceChecker/DistanceChecker'
import { IKeyLoaderFromMapSyntax } from './Keys/IKeyLoaderFromMapSyntax'
import { ListFileLoader } from './Keys/ListFileLoader'

/**
 * bve-mapのイベント管理
 */
export class MapController {
    private disposable: vscode.Disposable
    private keys: Enumerable.IEnumerable<IKeyLoaderFromMapSyntax>

    constructor(
        private distChecker: DistanceChecker,
        private listFileLoader: ListFileLoader,
        ...keys: IKeyLoaderFromMapSyntax[]
    ) {
        const subscriptions: vscode.Disposable[] = []
        this.keys = Enumerable.empty()

        // DistanceCheckerのイベント登録
        vscode.window.onDidChangeTextEditorSelection(this.updateDistance, this, subscriptions)
        vscode.window.onDidChangeActiveTextEditor(this.updateDistance, this, subscriptions)

        // ListFileLoaderのイベント登録
        vscode.workspace.onDidChangeConfiguration(this.loadListFiles, this, subscriptions)
        vscode.workspace.onDidSaveTextDocument(this.loadListFiles, this, subscriptions)
        vscode.workspace.onDidChangeWorkspaceFolders(this.loadListFiles, this, subscriptions)

        vscode.workspace.onDidChangeTextDocument(this.loadKeys, this, subscriptions)

        // 初期化
        this.distChecker.updateDistance()
        this.listFileLoader.loadFiles()

        this.disposable = vscode.Disposable.from(...subscriptions)
    }

    public dispose() {
        this.disposable.dispose()
    }

    private updateDistance() {
        this.distChecker.updateDistance()
    }

    private loadListFiles() {
        this.listFileLoader.loadFiles()
    }

    private loadKeys() {
        const editor = vscode.window.activeTextEditor
        if (editor !== undefined) {
            this.keys.forEach(k => {
                k!.clearKey()
                k!.addKeys(editor.document.getText())
            })
        }
    }
}
