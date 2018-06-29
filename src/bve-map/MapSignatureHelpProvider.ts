'use strict';
import * as vscode from 'vscode';

export class MapSignatureHelpProvider implements vscode.SignatureHelpProvider {

    private sampleSignature = new vscode.SignatureHelp();

    constructor() {
        let items: vscode.SignatureInformation[] = [new vscode.SignatureInformation("Begin0('trackKey', tilt, span, interval, structureKey*)", "ストラクチャーの連続配置を現在の距離程から開始します。")];
        items[0].parameters = [new vscode.ParameterInformation("trackKey", new vscode.MarkdownString("**trackKey**: 配置先の軌道名 (0: 自軌道)"))];
        this.sampleSignature.signatures = items;
    }

    /**
     * 引数に与えられた文字列から不要な部分を削除します。
     * @param trimText 未整形のマップファイルテキスト
     */
    private trimMapText(text: String): String {
        let lines = text.split('\n');
        var ret = "";
        for(let i in lines) {
            let commentIdx = lines[i].search(/#|\/\//);
            if(commentIdx !== -1) {
                lines[i] = lines[i].substring(0, commentIdx);
            }
            ret += lines[i].replace(/\s+/g, "");
        }
        console.log("TrimText:" + ret);
        return ret;
    }

    /**
     * 引数に与えられた文字列から関数名を取得して返します。
     * @param trimedText 整形済みのマップファイルテキスト
     */
    private getFuncName(trimedText: String): String {
        let startIdx = trimedText.lastIndexOf(";") + 1;
        let endIdx = trimedText.lastIndexOf("(");
        if(endIdx === -1) {
            endIdx = trimedText.length - 1;
        }
        return trimedText.substring(startIdx, endIdx);
    }

    /**
     * 引数に与えられた文字列から現在位置のパラメータ数を取得して返します。
     * パラメータ数が取得できない場合は-1を返します。
     * @param trimedText 整形済みのマップファイルテキスト
     */
    private getNowParamCount(trimedText: String): number {
        let startIdx = trimedText.lastIndexOf("(");
        if(startIdx === -1) {
            return -1;
        }else {
            let txt = trimedText.substring(startIdx);
            let m = txt.match(/,/gm);
            if(m !== null) {
                return m.length;
            }else {
                return 0;
            }
        }
    }

    public provideSignatureHelp(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken):
        Promise<vscode.SignatureHelp> {

            //テキスト取得
            let txt = this.trimMapText(
                document.getText(new vscode.Range(new vscode.Position(0, 0), position))
            );
            let nowChar = txt.substring(txt.length - 1);
            let funcName = this.getFuncName(txt);
            let paramCount = this.getNowParamCount(txt);

            console.log("nowChar:" + nowChar);
            console.log("funcName:" + funcName);
            console.log("paramCount:" + paramCount);

            return new Promise((resolve, reject) => {
                if(nowChar === ')' || nowChar === ';' || txt.match(/\(/) === null) {
                    reject();
                }else {
                    this.sampleSignature.activeParameter = paramCount;
                    this.sampleSignature.activeSignature = 0;
                    resolve(this.sampleSignature);
                }
            });
    }

    
}