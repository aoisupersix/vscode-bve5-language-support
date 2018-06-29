'use strict';
import * as vscode from 'vscode';

export class MapDocs {

    private static _instance: MapDocs;

    private syntaxes: MapDoc[] = [];

    private constructor() {
        //Curve.Begin
        let curve_begin = new MapDoc(MapSyntaxType.Syntax1, "Curve", "", "Begin", new vscode.MarkdownString("平面曲線の円曲線を現在の距離程から開始します。カントを設定する場合は、この手前に Curve.BeginTransition を記述する必要があります。"));
        curve_begin.addParameter("radius", new vscode.MarkdownString("曲線半径 [m] (正: 右曲線, 負: 左曲線)"));
        curve_begin.addParameter("cant", new vscode.MarkdownString("カント [m]"));

        this.syntaxes.push(curve_begin);
    }

    public static get instance(): MapDocs {
        if (!this._instance) {
            this._instance = new MapDocs();
        }

        return this._instance;
    }

    getSyntaxes() {
        return this.syntaxes;
    }
}

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
 * マップの各構文を格納するクラス
 */
export class MapDoc {

    private params: MapParameter[] = [];

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
        private document: vscode.MarkdownString
    ) {}

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
    getDisplayName(): string {
        let displayName = "";
        switch(this.syntaxType) {
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

        //引数の追加
        displayName += "(";
        for(let i in this.params) {
            displayName += this.params[i].Name + ", ";
        }
        displayName = displayName.substring(0, displayName.length - 2); //最後のコンマは消す
        displayName += ")";

        return displayName;
    }

    /**
     * 関数を取得します。
     */
    getParams(): MapParameter[] {
        return this.params;
    }

    /**
     * 引数に与えられたパラメータを追加します。
     * @param name パラメータ名
     * @param document パラメータの説明
     */
    addParameter(name: string, document: vscode.MarkdownString) {
        this.params.push(new MapParameter(name, document));
    }

    /**
     * 引数に与えられたらマップ構文と一致するか？
     * @param syntaxText マップ構文文字列
     */
    equals(syntaxText: string) : boolean {
        switch(this.syntaxType) {
            case MapSyntaxType.Syntax1:
                return syntaxText.match(new RegExp(`${this.mapElement1Name}\.${this.funcName}`, "i")) !== null;
            case MapSyntaxType.Syntax2:
                return syntaxText.match(new RegExp(`${this.mapElement1Name}\[(.*)\]\.${this.funcName}`, "i")) !== null;
            case MapSyntaxType.Syntax3:
                return syntaxText.match(new RegExp(`${this.mapElement1Name}\[(.*)\]\.${this.mapElement2Name}\.${this.funcName}`, "i")) !== null;
            default:
                return false;
        }
    }

    /**
     * SignatureHelpを取得します。
     */
    getSignatureHelp() : vscode.SignatureHelp {
        let ret = new vscode.SignatureHelp();
        let signature = new vscode.SignatureInformation(this.getDisplayName(), this.document);

        let paramInfos: vscode.ParameterInformation[] = [];
        for(let i in this.params) {
            paramInfos.push(this.params[i].getParameterInfo());
        }
        signature.parameters = paramInfos;
        
        ret.signatures = [signature];
        ret.activeSignature = 0;
        return ret;
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
        ){}

    /**
     * ParameterInfoを取得します。
     */
    getParameterInfo(): vscode.ParameterInformation {
        return new vscode.ParameterInformation(this.Name, this.Document);
    }
}