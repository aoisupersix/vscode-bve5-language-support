'use strict';
import * as vscode from 'vscode';

/**
 * マップ構文を管理するシングルトンクラス
 */
export class MapDocs {

    /**
     * インスタンス
     */
    private static _instance: MapDocs;

    /**
     * 全てのマップ構文
     */
    private syntaxes: MapDoc[] = [];

    /**
     * デフォルトのコンストラクタ
     * ここで構文の定義を行う
     */
    private constructor() {
        //Curve.Begin(radius, cant)
        let curve_begintransition = new MapDoc(
            MapSyntaxType.Syntax1, "Curve", "", "BeginTransition",
            this.convMarkDown("平面曲線の緩和曲線を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。"),
            [
            ],
        );

        //Curve.Begin(radius, cant)
        let curve_begin = new MapDoc(
            MapSyntaxType.Syntax1, "Curve", "", "Begin",
            this.convMarkDown("平面曲線の円曲線を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。カントを設定する場合は、この手前に Curve.BeginTransition を記述する必要があります。"),
            [
                this.createParam("radius", "曲線半径 [m] (正: 右曲線, 負: 左曲線)"),
                this.createParam("cant","カント [m]"),
            ],
        );
        //Curve.Begin2(radius)
        curve_begin.addSyntax(
            MapSyntaxType.Syntax1, "Curve", "", "Begin",
            this.convMarkDown("平面曲線の円曲線を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。"),
            [
                this.createParam("radius", "曲線半径 [m] (正: 右曲線, 負: 左曲線)"),
            ],
        );
        //Curve.Begin()
        curve_begin.addSyntax(
            MapSyntaxType.Syntax1, "Curve", "", "Begin",
            this.convMarkDown("平面曲線の円曲線を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。"),
            [
            ],
        );
        
        this.syntaxes.push(curve_begintransition);
        this.syntaxes.push(curve_begin);
    }


    /**
     * 引数に与えられたステータスからパラメータを生成します。
     * @param name パラメータ名
     * @param documentString パラメータの説明
     */
    private createParam(name: string, documentString: string) : MapParameter {
        return new MapParameter(name, this.convMarkDown(documentString));
    }

    /**
     * 引数に与えられた文字列をMarkDownStringに変換します。
     * @param str 変換する文字列
     */
    private convMarkDown(str: string) {
        return new vscode.MarkdownString(str);
    }

    /**
     * インスタンスを取得します。
     */
    public static get instance(): MapDocs {
        if (!this._instance) {
            this._instance = new MapDocs();
        }

        return this._instance;
    }

    /**
     * 全ての構文を取得します。
     */
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
    ) { this.addSyntax(syntaxType, mapElement1Name, mapElement2Name, funcName, document, params); }

    /**
     * 構文のシンタックスを追加します。
     * @param syntaxType マップ構文の種類
     * @param mapElement1Name マップ要素1名
     * @param mapElement2Name マップ要素2名
     * @param funcName 関数名
     * @param document 関数の説明
     * @param params 引数
     */
    addSyntax(
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

    /**
     * 引数に与えられたらマップ構文と一致するか？
     * @param syntaxText マップ構文文字列
     */
    equals(syntaxText: string) : boolean {
        switch(this.syntaxes[0].getSyntaxType()) {
            case MapSyntaxType.Syntax1:
                return syntaxText.match(new RegExp(`^${this.syntaxes[0].getMapElement1Name()}\.${this.syntaxes[0].getFuncName()}$`, "i")) !== null;
            case MapSyntaxType.Syntax2:
                return syntaxText.match(new RegExp(`^${this.syntaxes[0].getMapElement1Name()}\[(.*)\]\.${this.syntaxes[0].getFuncName()}$`, "i")) !== null;
            case MapSyntaxType.Syntax3:
                return syntaxText.match(new RegExp(`^${this.syntaxes[0].getMapElement1Name()}\[(.*)\]\.${this.syntaxes[0].getMapElement2Name()}\.${this.syntaxes[0].getFuncName()}$`, "i")) !== null;
            default:
                return false;
        }
    }

    /**
     * SignatureHelpを取得します。
     */
    getSignatureHelp() : vscode.SignatureHelp {
        let ret = new vscode.SignatureHelp();
        let signatures: vscode.SignatureInformation[] = [];
        for(let i in this.syntaxes) {
            let signature = new vscode.SignatureInformation(this.syntaxes[i].getDisplayName(), this.syntaxes[i].getDocument());
            signature.parameters = this.syntaxes[i].getSignatureParams();
            signatures.push(signature);
        }
        
        ret.signatures = signatures;
        ret.activeSignature = 0; //TODO
        return ret;
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
        if(this.params.length > 0) {
            for(let i in this.params) {
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
        for(let i in this.params) {
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
        ){}

    /**
     * ParameterInfoを取得します。
     */
    getParameterInfo(): vscode.ParameterInformation {
        return new vscode.ParameterInformation(this.Name, this.Document);
    }
}