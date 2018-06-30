'use strict';

import * as vscode from 'vscode';
import * as util from '../util';
import {MapDocs} from './MapDocs';

export class MapSignatureHelpProvider implements vscode.SignatureHelpProvider {

    constructor() {
    }

    /**
     * 引数に与えられた文字列から関数名を取得して返します。
     * @param trimedText 整形済みのマップファイルテキスト
     */
    private getFuncName(trimedText: string): string {
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
    private getNowParamCount(trimedText: string): number {
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
            let txt = util.trimMapText(
                document.getText(new vscode.Range(new vscode.Position(0, 0), position))
            );
            let nowChar = txt.substring(txt.length - 1);
            let funcName = this.getFuncName(txt);
            let funcFirstIdx = txt.lastIndexOf(funcName);
            let paramCount = this.getNowParamCount(txt);

            return new Promise((resolve, reject) => {
                if(nowChar === ')' || nowChar === ';' || txt.substring(funcFirstIdx).match(/\(/) === null) {
                    reject();
                }else {
                    let syntaxes = MapDocs.instance.getSyntaxes();
                    for(let i in syntaxes) {
                        if(syntaxes[i].isMatchSyntax(funcName)) {
                            let ret = syntaxes[i].getSignatureHelp(paramCount);
                            resolve(ret);
                        }
                    }
                    reject();
                }
            });
    }
}