'use strict';
import * as vscode from 'vscode';

/**
 * マップ構文の種類です。
 */
export enum MapSyntaxType {

    /**
     * マップ構文の種類1.
     * [マップ要素.関数();]
     */
    Syntax1,

    /**
     * マップ構文の種類2.
     * [マップ要素[キー].関数();]
     */
    Syntax2,

    /**
     * マップ要素の種類3.
     * [マップ要素1[キー].マップ要素2.関数();]
     */
    Syntax3,
}

/**
 * 一種類のマップ構文を格納するクラス
 */
export class MapDoc {

    /**
     * マップ構文
     * 引数が違うものを格納するために配列にしている
     */
    private syntaxes: MapSyntax[] = [];

    /**
     * デフォルトのコンストラクタ
     * @param syntaxType マップ構文の種類
     * @param mapElement1Name マップ要素1名
     * @param mapElement2Name マップ要素2名
     * @param funcName 関数名
     * @param document 関数の説明
     * @param params 引数
     */
    constructor(
        syntaxType: MapSyntaxType,
        mapElement1Name: string,
        mapElement2Name: string,
        funcName: string,
        document: vscode.MarkdownString,
        params: MapParameter[]
    ) {
        this.syntaxes.push(
            new MapSyntax(
                syntaxType,
                mapElement1Name,
                mapElement2Name,
                funcName,
                document,
                params
            )
        );
    }

    addSyntax(
        document: vscode.MarkdownString,
        params: MapParameter[]
    ) {
        this.syntaxes.push(
            new MapSyntax(
                this.syntaxes[0].getSyntaxType(),
                this.syntaxes[0].getMapElement1Name(),
                this.syntaxes[0].getMapElement2Name(),
                this.syntaxes[0].getFuncName(),
                document,
                params
            )
        );
    }

    /**
     * 保持している構文シンタックスを返します
     */
    getSyntaxes(): MapSyntax[] {
        return this.syntaxes;
    }

    /**
     * シンタックスのタイプを取得します。
     */
    getSyntaxType(): MapSyntaxType {
        return this.syntaxes[0].getSyntaxType();
    }

    /**
     * 引数に与えられたらマップ構文のマップ要素1名と一致するか？
     * @param mapElement1Text マップ要素1名
     */
    isMatchMapElement1(mapElement1Text: string): boolean {
        let type = this.syntaxes[0].getSyntaxType();
        if (type === MapSyntaxType.Syntax1) {
            //シンタックス1はキーがない
            return mapElement1Text.match(new RegExp(String.raw`^${this.syntaxes[0].getMapElement1Name()}$`, "i")) !== null;
        } else {
            return mapElement1Text.match(new RegExp(String.raw`^${this.syntaxes[0].getMapElement1Name()}\[.*\]$`, "i")) !== null;
        }
    }

    /**
     * 引数に与えられたマップ要素と一致するか？
     * 全てのシンタックスタイプに対応
     * @param mapElementText マップ要素
     */
    isMatchMapElement(mapElementText: string): boolean {
        let type = this.syntaxes[0].getSyntaxType();
        if (type === MapSyntaxType.Syntax1 || type === MapSyntaxType.Syntax2) {
            //シンタックス1 or 2の場合はマップ要素1のみの結果を返す
            return this.isMatchMapElement1(mapElementText);
        } else if (type === MapSyntaxType.Syntax3) {
            //シンタックス3の場合はマップ要素1 + マップ要素2の結果を返す
            return mapElementText.match(new RegExp(String.raw`^${this.syntaxes[0].getMapElement1Name()}\[.*\]\.${this.syntaxes[0].getMapElement2Name()}$`, "i")) !== null;
        }

        return false;
    }

    /**
     * 引数に与えられた関数名と一致するか？
     * @param funcName 関数名
     */
    isMatchFuncName(funcName: string): boolean {
        return funcName.match(new RegExp(String.raw`^${this.syntaxes[0].getFuncName()}$`, "gi")) !== null;
    }

    /**
     * 引数に与えられたらマップ構文のシンタックスと一致するか？
     * @param syntaxText マップ構文シンタックス
     */
    isMatchSyntax(syntaxText: string): boolean {
        switch (this.syntaxes[0].getSyntaxType()) {
            case MapSyntaxType.Syntax1:
                return syntaxText.match(new RegExp(String.raw`^${this.syntaxes[0].getMapElement1Name()}\.${this.syntaxes[0].getFuncName()}$`, "i")) !== null;
            case MapSyntaxType.Syntax2:
                return syntaxText.match(new RegExp(String.raw`^${this.syntaxes[0].getMapElement1Name()}\[.*\]\.${this.syntaxes[0].getFuncName()}$`, "i")) !== null;
            case MapSyntaxType.Syntax3:
                return syntaxText.match(new RegExp(String.raw`^${this.syntaxes[0].getMapElement1Name()}\[.*\]\.${this.syntaxes[0].getMapElement2Name()}\.${this.syntaxes[0].getFuncName()}$`, "i")) !== null;
            default:
                return false;
        }
    }

    /**
     * SignatureHelpを取得します。
     */
    getSignatureHelp(paramIdx: number): vscode.SignatureHelp {
        let ret = new vscode.SignatureHelp();
        let signatures: vscode.SignatureInformation[] = [];
        for (let i in this.syntaxes) {
            let signature = new vscode.SignatureInformation(this.syntaxes[i].getSyntaxDisplayName() + this.syntaxes[i].getParameterDispalyName(), this.syntaxes[i].getDocument());
            signature.parameters = this.syntaxes[i].getSignatureParams();
            signatures.push(signature);
        }

        ret.signatures = signatures.sort((a, b) => a.parameters.length - b.parameters.length); //パラメータ数で昇順ソート
        //パラメータ数からシグネチャを選択
        ret.activeSignature = ret.signatures.length - 1;
        for (var i = ret.signatures.length - 1; i >= 0; i--) {
            if ((paramIdx + 1) <= ret.signatures[i].parameters.length) {
                ret.activeSignature = i;
            }
        }

        //アクティブパラメータの設定
        ret.activeParameter = paramIdx;
        return ret;
    }

    /**
     * マップ要素1のコード補完アイテムを取得します。
     */
    getMapElement1CompletionItem(): vscode.CompletionItem {
        return new vscode.CompletionItem(this.syntaxes[0].getMapElement1Name(), vscode.CompletionItemKind.Class);
    }

    /**
     * マップ要素2のコード補完アイテムを取得します。(シンタックス3のみ)
     */
    getMapElement2CompletionItem(): vscode.CompletionItem {
        return new vscode.CompletionItem(this.syntaxes[0].getMapElement2Name(), vscode.CompletionItemKind.Function);
    }

    /**
     * 関数名のコード補完アイテムを取得します。
     */
    getFunctionCompletionItem(): vscode.CompletionItem {
        return new vscode.CompletionItem(this.syntaxes[0].getFuncName(), vscode.CompletionItemKind.Function);
    }

    /**
     * マップ要素1のホバーを取得します。
     * @param range　ホバー範囲
     */
    getMapElement1Hover(range: vscode.Range): vscode.Hover {
        return new vscode.Hover(
            [
                new vscode.MarkdownString(`マップ要素： ${this.syntaxes[0].getMapElement1Name()}`),
                this.syntaxes[0].getDocument()
            ],
            range
        );
    }

    /**
     * 関数名のホバーを取得します。
     * @param range ホバー範囲
     */
    getFunctionHover(range: vscode.Range): vscode.Hover {
        return new vscode.Hover(
            [
                new vscode.MarkdownString(`${this.syntaxes[0].getSyntaxDisplayName()}`),
                this.syntaxes[0].getDocument()
            ],
            range
        );
    }
}

/**
 * 一つのマップ構文を格納するクラス
 */
export class MapSyntax {

    /**
     * デフォルトのコンストラクタ
     * @param syntaxType マップ構文の種類
     * @param mapElement1Name マップ要素1名
     * @param mapElement2Name マップ要素2名
     * @param funcName 関数名
     * @param document 関数の説明
     */
    constructor(
        private syntaxType: MapSyntaxType,
        private mapElement1Name: string,
        private mapElement2Name: string,
        private funcName: string,
        private document: vscode.MarkdownString,
        private params: MapParameter[]
    ) { }

    /**
     * マップ構文の種類を取得します。
     */
    getSyntaxType(): MapSyntaxType {
        return this.syntaxType;
    }

    /**
     * マップ要素1名を取得します。
     */
    getMapElement1Name(): string {
        return this.mapElement1Name;
    }

    /**
     * マップ要素2名を取得します。
     */
    getMapElement2Name(): string {
        return this.mapElement2Name;
    }

    /**
     * 関数名を取得します。
     */
    getFuncName(): string {
        return this.funcName;
    }

    /**
     * 関数の説明を取得します。
     */
    getDocument(): vscode.MarkdownString {
        return this.document;
    }

    /**
     * 構文の表示名を取得します。
     */
    getSyntaxDisplayName(): string {
        let displayName = "";
        switch (this.syntaxType) {
            case MapSyntaxType.Syntax1:
                displayName += `${this.mapElement1Name}.${this.funcName}`;
                break;
            case MapSyntaxType.Syntax2:
                displayName += `${this.mapElement1Name}.${this.funcName}`;
                break;
            case MapSyntaxType.Syntax3:
                displayName += `${this.mapElement1Name}.${this.mapElement2Name}.${this.funcName}`;
                break;
        }

        return displayName;
    }

    /**
     * 引数の表示名を取得します。
     */
    getParameterDispalyName(): string {
        let displayName = "";

        //引数の追加
        displayName += "(";
        if (this.params.length > 0) {
            for (let i in this.params) {
                displayName += this.params[i].Name + ", ";
            }
            displayName = displayName.substring(0, displayName.length - 2); //最後のコンマは消す
        }
        displayName += ")";

        return displayName;
    }

    /**
     * ParameterInfomationの配列を取得します。
     */
    getSignatureParams(): vscode.ParameterInformation[] {
        let paramInfos: vscode.ParameterInformation[] = [];
        for (let i in this.params) {
            paramInfos.push(this.params[i].getParameterInfo());
        }
        return paramInfos;
    }
}

/**
 * 構文の引数を格納するクラス
 */
export class MapParameter {

    /**
     * デフォルトのコンストラクタ
     * @param Name 引数名
     * @param Document 引数の説明
     */
    constructor(
        public Name: string,
        public Document: vscode.MarkdownString
    ) { }

    /**
     * ParameterInfoを取得します。
     */
    getParameterInfo(): vscode.ParameterInformation {
        return new vscode.ParameterInformation(this.Name, this.Document);
    }
}