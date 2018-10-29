'use strict';

import * as vscode from 'vscode';
import { DistanceChecker } from './bve-map/DistanceChecker';
import { DistanceCheckerController } from './bve-map/DistanceCheckerController';
import { MapSignatureHelpProvider } from './bve-map/MapSignatureHelpProvider';
import { MapCompletionItemProvider } from './bve-map/MapCompletionItemProvider';
import { MapHoverProvider } from './bve-map/MapHoverProvider';
import { ListFileLoaderController } from './bve-map/ListFileLoaderController';
import { VehicleHoverProvider } from './bve-vehicle/VehicleHoverProvider';

const BVE_MAP_MODE: vscode.DocumentFilter = {language: 'bve-map-2.02', scheme: 'file' };
const BVE_VEHICLE_MODE: vscode.DocumentFilter = {language: 'bve-vehicle-1.00', scheme: 'file' };

const LANG_ID_MAP: string = "bve-map-2.02";

export function activate(context: vscode.ExtensionContext) {
    let editor = vscode.window.activeTextEditor;
    if(editor != undefined && editor.document.languageId === LANG_ID_MAP) {
        let distChecker = new DistanceChecker();
        let controller = new DistanceCheckerController(distChecker);

        context.subscriptions.push(controller);
        context.subscriptions.push(distChecker);
    }

    //マップ
    context.subscriptions.push(vscode.languages.registerSignatureHelpProvider(BVE_MAP_MODE, new MapSignatureHelpProvider(), '('));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(BVE_MAP_MODE, new MapCompletionItemProvider(), '.', '\''));
    context.subscriptions.push(vscode.languages.registerHoverProvider(BVE_MAP_MODE, new MapHoverProvider()));
    //車両
    context.subscriptions.push(vscode.languages.registerHoverProvider(BVE_VEHICLE_MODE, new VehicleHoverProvider()));

    //リストファイル
    context.subscriptions.push(new ListFileLoaderController());
}

export function deactivate() {
}