'use strict';

import * as vscode from 'vscode';
import { VehicleDocs } from './VehicleDocs';
//import { List } from 'linqts';

export class VehicleHoverProvider implements vscode.HoverProvider {
    public provideHover(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.Hover> {
        return new Promise((resolve, reject) => {

            let word_range = document.getWordRangeAtPosition(position)
            if (word_range === undefined) {
                reject();
                return;
            }
            let now_word = document.getText(word_range);
            let elements = VehicleDocs.instance.getElements();

            for(let i in elements) {
                if(elements[i].isMatch(now_word)) {
                    resolve(elements[i].getMapHover(word_range));
                    return;
                }
            }
            reject();
        })
    }
}