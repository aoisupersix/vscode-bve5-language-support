'use strict';

import * as vscode from 'vscode';
import * as util from '../util';
import { MapDocs } from './MapDocs';
//import { List } from 'linqts';

export class MapHoverProvider implements vscode.HoverProvider {
    public provideHover(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.Hover> {
        return new Promise((resolve, reject) => {

            //マップ要素のホバー
            let mapElement1range = document.getWordRangeAtPosition(position)
            if (mapElement1range !== undefined) {
                let mapElement1name = document.getText(mapElement1range);
                let mapElements = MapDocs.instance.getMapElements();
                for (let i in mapElements) {
                    if (mapElements[i].isMatchMapElement1(mapElement1name)) {
                        resolve(mapElements[i].getMapElement1Hover(mapElement1range))
                        return;
                    }
                }
            }
            reject();
        })
    }
}