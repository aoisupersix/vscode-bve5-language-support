'use strict';

import * as vscode from 'vscode';
import {MapDocs} from './MapDocs';

export class MapCompletionItemProvider implements vscode.CompletionItemProvider {

    constructor() {
    }

    /**
     * 引数に与えられた文字列から不要な部分を削除します。
     * @param trimText 未整形のマップファイルテキスト
     */
    private trimMapText(text: string): string {
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
    private getFuncName(trimedText: string): string {
        let startIdx = trimedText.lastIndexOf(";") + 1;
        let endIdx = trimedText.lastIndexOf(".");
        if(endIdx === -1) {
            endIdx = trimedText.length - 1;
        }
        return trimedText.substring(startIdx, endIdx);
    }

    public provideCompletionItems(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken):
        Promise<vscode.CompletionItem[]> {

            //テキスト取得
            let txt = this.trimMapText(
                document.getText(new vscode.Range(new vscode.Position(0, 0), position))
            );
            let nowChar = txt.substring(txt.length - 1);
            let funcName = this.getFuncName(txt);

            console.log("nowChar:" + nowChar);
            console.log("funcName:" + funcName);

            return new Promise((resolve, reject) => {
                if(funcName === "") {
                    reject();
                }else {
                    let items: vscode.CompletionItem[] = [];
                    items.push(new vscode.CompletionItem("item1", vscode.CompletionItemKind.Function));
                    resolve(items);
                }
            });
    }
}