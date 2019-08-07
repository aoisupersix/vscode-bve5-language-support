import * as vscode from 'vscode'

/**
 * 構文の引数を格納するクラス
 */
export class MapParameter {
    /**
     * デフォルトのコンストラクタ
     * @param name 引数名
     * @param Document 引数の説明
     * @param isStructureKey この引数はストラクチャーキーか？(Optional)
     * @param isTrackKey この引数はトラックキーか？(Optional)
     */
    constructor(
        public name: string,
        public document: vscode.MarkdownString,
        public isStructureKey: boolean = false,
        public isTrackKey: boolean = false
    ) {}

    /**
     * ParameterInfoを取得します。
     */
    public getParameterInfo(): vscode.ParameterInformation {
        return new vscode.ParameterInformation(this.name, this.document)
    }
}
