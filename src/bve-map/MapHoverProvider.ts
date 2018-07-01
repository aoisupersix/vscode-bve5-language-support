'use strict';

import * as vscode from 'vscode';
import * as util from '../util';
import { MapDocs, MapDoc } from './MapDocs';
//import { List } from 'linqts';

export class MapHoverProvider implements vscode.HoverProvider {
    public provideHover(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.Hover> {
        return new Promise((resolve, reject) => {

            let word_range = document.getWordRangeAtPosition(position)
            if (word_range === undefined) {
                reject();
                return;
            }
            let now_word = document.getText(word_range);

            //マップ要素1のホバー
            let mapElements = MapDocs.instance.getMapElements();
            for (let i in mapElements) {
                if (mapElements[i].isMatchMapElement1(now_word)) {
                    resolve(mapElements[i].getMapElement1Hover(word_range))
                    return;
                }
            }

            //TODO マップ要素2のホバー

            //関数名のホバー
            let syntaxes = MapDocs.instance.getSyntaxes();
            //まずは一致する関数名を全て取得
            let funcs: MapDoc[] = [];
            for(let i in syntaxes) {
                if (syntaxes[i].isMatchFuncName(now_word)) {
                    funcs.push(syntaxes[i]);
                }
            }
            //一致なし
            if (funcs.length === 0) {
                reject();
                return;
            }
            //一致する関数名が一つであれば、めでたくここでホバーを返す
            if (funcs.length === 1) {
                resolve(funcs[0].getFunctionHover(word_range));
                return;
            }
            //フルの構文名を取得
            let beforeText = util.trimMapText(document.getText(new vscode.Range(new vscode.Position(0, 0), word_range.start)));
            let startIdx = beforeText.lastIndexOf(";") + 1;
            let syntaxName = beforeText.substring(startIdx) + now_word;
            for(let i in funcs) {
                if (funcs[i].isMatchSyntax(syntaxName)) {
                    resolve(funcs[i].getFunctionHover(word_range));
                    return;
                }
            }
            reject();
        })
    }
}