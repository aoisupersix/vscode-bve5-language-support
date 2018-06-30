'use strict';

import * as vscode from 'vscode';
import {MapDocs, MapSyntaxType} from './MapDocs';
import { List } from 'linqts';

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
            let mapElementName = this.getFuncName(txt);

            console.log("nowChar:" + nowChar);
            console.log("mapElement1Name:" + mapElementName);

            return new Promise((resolve, reject) => {
                if(mapElementName === "") {
                    reject();
                }else {
                    let syntaxes = MapDocs.instance.getSyntaxes();
                    let ret = new List<vscode.CompletionItem>();

                    //一致する補完の追加
                    for(let i in syntaxes) {
                        //関数名補完
                        if(syntaxes[i].isMatchMapElement(mapElementName)) {
                            let item = syntaxes[i].getFunctionCompletionItem();
                            //重複チェック
                            if(!ret.Any(x => x!.label === item.label)) {
                                ret.Add(item);
                            }
                        }
                        if(syntaxes[i].getSyntaxType() === MapSyntaxType.Syntax3) {
                            //シンタックス3のマップ要素2補完
                            if(syntaxes[i].isMatchMapElement1(mapElementName)) {
                                let item = syntaxes[i].getMapElement2CompletionItem();
                                //重複チェック
                                if(!ret.Any(x => x!.label === item.label)) {
                                    ret.Add(item);
                                }                         
                            }
                        }
                    }
                    if(ret.Any()) {
                        resolve(ret.ToArray());
                    }
                    reject();
                }
            });
    }
}