'use strict';

import * as vscode from 'vscode';
import * as util from '../util';
import { MapDocs } from './MapDocs';
import { MapSyntaxType } from './MapDoc';
import { StructureKeys } from '../bve-structures/StructureKeys';
import { List } from 'linqts';

export class MapCompletionItemProvider implements vscode.CompletionItemProvider {

    public static readonly FUNC_COMPLETION_TOKEN: string = '.';
    public static readonly KEY_COMPLETION_TOKEN: string = '\'';

    /**
     * 引数に与えられた文字列から関数名を取得して返します。
     * @param trimedText 整形済みのマップファイルテキスト
     */
    private getFuncName(trimedText: string): string {
        let startIdx = trimedText.lastIndexOf(";") + 1;
        let endIdx = trimedText.lastIndexOf(".");
        if(endIdx === -1) {
            endIdx = trimedText.length;
        }
        return trimedText.substring(startIdx, endIdx);
    }

    /**
     * 関数名のCompletionItemを生成して返します。
     * @param txt マップ構文
     */
    private getFuncCompletionItems(txt: string): Promise<vscode.CompletionItem[]> {

        return new Promise((resolve, reject) => {
            let mapElementName = this.getFuncName(txt);
            let syntaxes = MapDocs.instance.getSyntaxes();
            let ret = new List<vscode.CompletionItem>();

            if(mapElementName === "") { reject(); }
            else {
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
            }

            if(ret.Any()) { resolve(ret.ToArray()); }
            
            reject();
        });
    }

    private getKeyCompletionItems(txt: string): Promise<vscode.CompletionItem[]> {
        return new Promise((resolve, reject) => {
            const strKeys = StructureKeys.instance.KeyList;
            if (txt.substring(txt.length - 2) === '[\'') {
                //関数のキー名
                const a = txt.substring(0, txt.length - 2);
                const mapElementName = this.getFuncName(a);
                if (mapElementName === 'Structure') {
                    //ストラクチャーリストの表示
                    resolve(strKeys.Select(k => new vscode.CompletionItem(k[0], vscode.CompletionItemKind.Variable)).ToArray());
                    return;
                }
            }
            //TODO
            reject();
        });
    }

    public provideCompletionItems(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken):
        Promise<vscode.CompletionItem[]> {

            //テキスト取得
            let txt = util.trimMapText(
                document.getText(new vscode.Range(new vscode.Position(0, 0), position))
            );
            let nowChar = txt.substring(txt.length - 1);

            if (nowChar === MapCompletionItemProvider.FUNC_COMPLETION_TOKEN) { return this.getFuncCompletionItems(txt); }
            else if (nowChar === MapCompletionItemProvider.KEY_COMPLETION_TOKEN) { return this.getKeyCompletionItems(txt); }

            return new Promise((resolve, reject) => { reject(); });
    }
}