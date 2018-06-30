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
        //#region カーブ
        //Curve.SetGauge(value)
        let curve_setgauge = new MapDoc(
            MapSyntaxType.Syntax1, "Curve", "", "SetGauge",
            this.convMarkDown("[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降の軌間を設定します。この値は、カントを角度に換算するために使用します。"),
            [
                this.createParam("value", "**value**: 軌間 [m]"),
            ],
        );

        //Curve.SetCenter(x)
        let curve_setcenter = new MapDoc(
            MapSyntaxType.Syntax1, "Curve", "", "SetGauge",
            this.convMarkDown("[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降のカントの回転中心位置を設定します。"),
            [
                this.createParam("x", "**x**: 軌間 [m]"),
            ],
        );

        //Curve.SetFunction(id)
        let curve_setfunction = new MapDoc(
            MapSyntaxType.Syntax1, "Curve", "", "SetFunction",
            this.convMarkDown("[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降の緩和曲線関数を設定します。"),
            [
                this.createParam("id", "**id**: 関数番号 (0: サイン半波長逓減, 1: 直線逓減)"),
            ],
        );

        //Curve.BeginTransition()
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
                this.createParam("radius", "**radius**: 曲線半径 [m] (正: 右曲線, 負: 左曲線)"),
                this.createParam("cant","**cant**: カント [m]"),
            ],
        );
        //Curve.Begin2(radius)
        curve_begin.addSyntax(
            this.convMarkDown("平面曲線の円曲線を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。"),
            [
                this.createParam("radius", "**radius**: 曲線半径 [m] (正: 右曲線, 負: 左曲線)"),
            ],
        );
        //Curve.Begin()
        curve_begin.addSyntax(
            this.convMarkDown("平面曲線の円曲線を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。"),
            [
            ],
        );

        //Curve.End()
        let curve_end = new MapDoc(
            MapSyntaxType.Syntax1, "Curve", "", "End",
            this.convMarkDown("平面曲線を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)で終了し、直線を開始します。"),
            [
            ],
        );

        //Curve.Interpolate(radius, cant)
        let curve_interpolate = new MapDoc(
            MapSyntaxType.Syntax1, "Curve", "", "Interpolate",
            this.convMarkDown("現在の距離程における平面曲線の半径とカントを設定します。1 つ手前の Curve.Interpolate または Curve.Change の間は補間されます。補間関数は、Curve.SetFunction で設定します。"),
            [
                this.createParam("radius", "**radius**: 曲線半径 [m] (正: 右曲線, 負: 左曲線, 0: 直線)"),
                this.createParam("cant","**cant**: カント [m]"),
            ],
        );
        //Curve.Interpolate(radius)
        curve_interpolate.addSyntax(
            this.convMarkDown("現在の距離程における平面曲線の半径とカントを設定します。1 つ手前の Curve.Interpolate または Curve.Change の間は補間されます。補間関数は、Curve.SetFunction で設定します。引数を省略した場合、1 つ手前の Curve.Interpolate の値が使用されます。"),
            [
                this.createParam("radius", "**radius**: 曲線半径 [m] (正: 右曲線, 負: 左曲線, 0: 直線)"),
            ],
        );
        //Curve.Interpolate()
        curve_interpolate.addSyntax(
            this.convMarkDown("現在の距離程における平面曲線の半径とカントを設定します。1 つ手前の Curve.Interpolate または Curve.Change の間は補間されます。補間関数は、Curve.SetFunction で設定します。引数を省略した場合、1 つ手前の Curve.Interpolate の値が使用されます。"),
            [
            ],
        );

        //Curve.Change(radius)
        let curve_change = new MapDoc(
            MapSyntaxType.Syntax1, "Curve", "", "Change",
            this.convMarkDown("現在の距離程以降の平面曲線の半径を設定します。Curve.Begin(radius) と同等です。"),
            [
                this.createParam("id", "**id**: 曲線半径 [m] (正: 右曲線, 負: 左曲線, 0: 直線)"),
            ],
        );
        
        this.syntaxes.push(
            curve_setgauge,
            curve_setcenter,
            curve_setfunction,
            curve_begintransition,
            curve_begin,
            curve_end,
            curve_interpolate,
            curve_change
        );
        //#endregion

        //#region 自軌道の勾配

        //Gradient.BeginTransition()
        let gradient_begintransition = new MapDoc(
            MapSyntaxType.Syntax1, "Gradient", "", "BeginTransition",
            this.convMarkDown("縦曲線を現在の距離程から開始します。"),
            [
            ],
        );

        //Gradient.Begin(gradient)
        let gradient_begin = new MapDoc(
            MapSyntaxType.Syntax1, "Gradient", "", "Begin",
            this.convMarkDown("縦曲線を現在の距離程で終了し、勾配を一定に保ちます。"),
            [
                this.createParam("gradient", "**gradient**: 勾配 [‰]"),
            ],
        );

        //Gradient.End()
        let gradient_end = new MapDoc(
            MapSyntaxType.Syntax1, "Gradient", "", "End",
            this.convMarkDown("勾配を現在の距離程で終了し、レベル (水平) を開始します。"),
            [
            ],
        );

        //Gradient.Interpolate(gradient)
        let gradient_interpolate = new MapDoc(
            MapSyntaxType.Syntax1, "Gradient", "", "Interpolate",
            this.convMarkDown("現在の距離程における勾配を設定します。2 つの Gradient.Interpolate の間の勾配は線形補間されます。"),
            [
                this.createParam("gradient", "**gradient**: 勾配 [‰]"),
            ],
        );
        //Gradient.Interpolate()
        gradient_interpolate.addSyntax(
            this.convMarkDown("現在の距離程における勾配を設定します。2 つの Gradient.Interpolate の間の勾配は線形補間されます。引数を省略した場合、1 つ手前の Gradient.Interpolate の値が使用されます。"),
            [
            ],
        );

        this.syntaxes.push(
            gradient_begintransition,
            gradient_begin,
            gradient_end,
            gradient_interpolate,
        );

        //#endregion

        //#region 他軌道

        //Track[].X.Interpolate(x, radius)
        let track_x_interpolate = new MapDoc(
            MapSyntaxType.Syntax3, "Track", "X", "Interpolate",
            this.convMarkDown("現在の[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における他軌道の x 方向位置を設定します。2 つの Track[].X.Interpolate との間の x 座標は補間されます。引数が省略された場合、1 つ手前の Track[].X.Interpolate の値が使用されます。"),
            [
                this.createParam("x", "**x**: 自軌道からの x 座標 [m]"),
                this.createParam("radius", "**radius**: 現在の距離程以降の自軌道との平面曲線相対半径 [m] (0: 直線)")
            ],
        );
        //Track[].X.Interpolate(x)
        track_x_interpolate.addSyntax(
            this.convMarkDown("現在の[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における他軌道の x 方向位置を設定します。2 つの Track[].X.Interpolate との間の x 座標は補間されます。引数が省略された場合、1 つ手前の Track[].X.Interpolate の値が使用されます。"),
            [
                this.createParam("x", "**x**: 自軌道からの x 座標 [m]"),
            ],
        );
        //Track[].X.Interpolate()
        track_x_interpolate.addSyntax(
            this.convMarkDown("現在の[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における他軌道の x 方向位置を設定します。2 つの Track[].X.Interpolate との間の x 座標は補間されます。引数が省略された場合、1 つ手前の Track[].X.Interpolate の値が使用されます。"),
            [
            ],
        );

        //Track[].Y.Interpolate(x, radius)
        let track_y_interpolate = new MapDoc(
            MapSyntaxType.Syntax3, "Track", "Y", "Interpolate",
            this.convMarkDown("現在の[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における他軌道の y 方向位置を設定します。2 つの Track[].Y.Interpolate との間の y 座標は補間されます。引数が省略された場合、1 つ手前の Track[].Y.Interpolate の値が使用されます。"),
            [
                this.createParam("y", "**y**: 自軌道からの y 座標 [m]"),
                this.createParam("radius", "**radius**: 現在の距離程以降の自軌道との縦曲線相対半径 [m] (0: 直線)")
            ],
        );
        //Track[].Y.Interpolate(x)
        track_y_interpolate.addSyntax(
            this.convMarkDown("現在の[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における他軌道の y 方向位置を設定します。2 つの Track[].Y.Interpolate との間の y 座標は補間されます。引数が省略された場合、1 つ手前の Track[].Y.Interpolate の値が使用されます。"),
            [
                this.createParam("y", "**y**: 自軌道からの y 座標 [m]"),
            ],
        );
        //Track[].Y.Interpolate()
        track_y_interpolate.addSyntax(
            this.convMarkDown("現在の[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における他軌道の y 方向位置を設定します。2 つの Track[].Y.Interpolate との間の y 座標は補間されます。引数が省略された場合、1 つ手前の Track[].Y.Interpolate の値が使用されます。"),
            [
            ],
        );

        //Track[].Position(x, y, radiusH, radiusV)
        let track_position = new MapDoc(
            MapSyntaxType.Syntax2, "Track", "", "Position",
            this.convMarkDown("現在の距離程における他軌道の位置を設定します。Track[].X.Interpolate と Track[].Y.Interpolate を同時に記述することと同等です。"),
            [
                this.createParam("x", "**x**: 自軌道からの x 座標 [m]"),
                this.createParam("y", "**y**: 自軌道からの y 座標 [m]"),
                this.createParam("radiusH", "**radiusH**: 現在の距離程以降の自軌道との平面曲線相対半径 [m] (0: 直線)"),
                this.createParam("radiusV", "**radiusV**: 現在の距離程以降の自軌道との縦曲線相対半径 [m] (0: 直線)"),
            ]
        );
        //Track[].Position(x, y, radiusH)
        track_position.addSyntax(
            this.convMarkDown("現在の距離程における他軌道の位置を設定します。Track[].X.Interpolate と Track[].Y.Interpolate を同時に記述することと同等です。ただし、引数が省略された場合、0 が代入されます。"),
            [
                this.createParam("x", "**x**: 自軌道からの x 座標 [m]"),
                this.createParam("y", "**y**: 自軌道からの y 座標 [m]"),
                this.createParam("radiusH", "**radiusH**: 現在の距離程以降の自軌道との平面曲線相対半径 [m] (0: 直線)"),
            ]
        );
        //Track[].Position(x, y)
        track_position.addSyntax(
            this.convMarkDown("現在の距離程における他軌道の位置を設定します。Track[].X.Interpolate と Track[].Y.Interpolate を同時に記述することと同等です。ただし、引数が省略された場合、0 が代入されます。"),
            [
                this.createParam("x", "**x**: 自軌道からの x 座標 [m]"),
                this.createParam("y", "**y**: 自軌道からの y 座標 [m]"),
            ]
        );

        //Track[].Cant.SetGauge(gauge)
        let track_cant_setgauge = new MapDoc(
            MapSyntaxType.Syntax3, "Track", "Cant", "SetGauge",
            this.convMarkDown("現在の距離程以降の他軌道の軌間を設定します。この値は、カントを角度に換算するために使用します。"),
            [
                this.createParam("gauge", "**gauge**: 軌間 [m]"),
            ],
        );

        //Track[].Cant.SetCenter(x)
        let track_cant_setcenter = new MapDoc(
            MapSyntaxType.Syntax3, "Track", "Cant", "SetCenter",
            this.convMarkDown("現在の距離程以降の他軌道のカントの回転中心位置を設定します。"),
            [
                this.createParam("x", "**x**: 回転中心の x 座標 [m] (正: 曲線の内側, 負: 曲線の外側)"),
            ],
        );

        //Track[].Cant.SetFunction(id)
        let track_cant_setfunction = new MapDoc(
            MapSyntaxType.Syntax3, "Track", "Cant", "SetFunction",
            this.convMarkDown("現在の距離程以降の他軌道のカント逓減関数を設定します。"),
            [
                this.createParam("id", "**id**: 関数番号 (0: サイン半波長逓減, 1: 直線逓減)"),
            ],
        );

        //Track[].Cant.BeginTransition()
        let track_cant_begintransition = new MapDoc(
            MapSyntaxType.Syntax3, "Track", "Cant", "BeginTransition",
            this.convMarkDown("他軌道のカントの逓減を現在の距離程から開始します。"),
            [
            ],
        );

        //Track[].Cant.Begin(cant)
        let track_cant_begin = new MapDoc(
            MapSyntaxType.Syntax3, "Track", "Cant", "Begin",
            this.convMarkDown("他軌道のカントの逓減を現在の距離程で終了し、カントを一定に保ちます。"),
            [
                this.createParam("cant", "**cant**: カント [m] (正: 右に傾ける, 負: 左に傾ける)"),
            ],
        );

        //Track[].Cant.End()
        let track_cant_end = new MapDoc(
            MapSyntaxType.Syntax3, "Track", "Cant", "End",
            this.convMarkDown("他軌道のカントを現在の距離程で終了します。"),
            [
            ],
        );

        //Track[].Cant.Interpolate(cant)
        let track_cant_interpolate = new MapDoc(
            MapSyntaxType.Syntax3, "Track", "Cant", "Interpolate",
            this.convMarkDown("現在の距離程における他軌道のカントを設定します。2 つの Track[].Cant.Interpolate の間のカントは補間されます。補間関数は、Track[].Cant.SetFunction で設定します。"),
            [
                this.createParam("cant", "**cant**: カント [m] (正: 右に傾ける, 負: 左に傾ける)"),
            ],
        );

        //Track[].Cant.Interpolate()
        track_cant_interpolate.addSyntax(
            this.convMarkDown("現在の距離程における他軌道のカントを設定します。2 つの Track[].Cant.Interpolate の間のカントは補間されます。補間関数は、Track[].Cant.SetFunction で設定します。引数を省略した場合、1 つ手前の Track[].Cant.Interpolate の値が使用されます。"),
            [
            ],
        );

        this.syntaxes.push(
            track_x_interpolate,
            track_y_interpolate,
            track_position,
            track_cant_setgauge,
            track_cant_setcenter,
            track_cant_setfunction,
            track_cant_begintransition,
            track_cant_begin,
            track_cant_end,
            track_cant_interpolate
        );
        //#endregion
    
        //#region ストラクチャ

        //Structure.Load(filePath)
        let structure_load = new MapDoc(
            MapSyntaxType.Syntax1, "Structure", "", "Load",
            this.convMarkDown("ストラクチャーリストファイルにもとづいてストラクチャーを読み込みます。ストラクチャーを使用する前にこの構文を記述する必要があります。"),
            [
                this.createParam("filePath", "**filePath**: このファイルからストラクチャーリストファイルへの相対パス"),
            ]
        );

        //Structure.Put(trackKey, x, y, z, rx, ry, rz, tilt, span)
        let structure_put = new MapDoc(
            MapSyntaxType.Syntax2, "Structure", "", "Put",
            this.convMarkDown("ストラクチャーを設置します。"),
            [
                this.createParam("trackKey", "**trackKey**: 配置先の軌道名 (0: 自軌道)"),
                this.createParam("x", "**x**: 軌道からの x 座標 [m]"),
                this.createParam("y", "**y**: 軌道からの y 座標 [m]"),
                this.createParam("z", "**z**: 現在の距離程からの z 座標 [m]"),
                this.createParam("rx", "**rx**: 軌道に対する x 軸回りの角 [deg]"),
                this.createParam("ry", "**ry**: 軌道に対する y 軸回りの角 [deg]"),
                this.createParam("rz", "**rz**: 軌道に対する z 軸回りの角 [deg]"),
                this.createParam("tilt", "**tilt**: 傾斜オプション (0: 常に水平, 1: 勾配に連動, 2: カントに連動, 3: 勾配とカントに連動)"),
                this.createParam("span", "**span**: 曲線における弦の長さ [m]"),
            ]
        );

        //Structure.Put0(trackKey, tilt, span)
        let structure_put0 = new MapDoc(
            MapSyntaxType.Syntax2, "Structure", "", "Put0",
            this.convMarkDown("ストラクチャーを設置します。Structure[].Put 構文の x, y, z, rx, ry, rz に 0 を設定したことと同じです。"),
            [
                this.createParam("trackKey", "**trackKey**: 配置先の軌道名 (0: 自軌道)"),
                this.createParam("tilt", "**tilt**: 傾斜オプション (0: 常に水平, 1: 勾配に連動, 2: カントに連動, 3: 勾配とカントに連動)"),
                this.createParam("span", "**span**: 曲線における弦の長さ [m]"),
            ]
        );

        //Structure.PutBetween(trackKey1, trackKey2, flag)
        let structure_putbetween = new MapDoc(
            MapSyntaxType.Syntax2, "Structure", "", "PutBetWeen",
            this.convMarkDown("ストラクチャーを設置します。Structure[].Put 構文の x, y, z, rx, ry, rz に 0 を設定したことと同じです。"),
            [
                this.createParam("trackKey1", "**trackKey1**: 一方の軌道の軌道名 (0: 自軌道)"),
                this.createParam("trackKey2", "**trackKey2**: 他方の軌道の軌道名"),
                this.createParam("flag", "**flag**: 変形方向 (0: x および y 方向に変形, 1: x 方向のみに変形)"),
            ]
        );

        //Structure.PutBetween(trackKey1, trackKey2)
        structure_putbetween.addSyntax(
            this.convMarkDown("ストラクチャーを現在の距離程の 2 つの軌道の間に設置します。ストラクチャーは、軌道間の距離に応じて変形します。"),
            [
                this.createParam("trackKey1", "**trackKey1**: 一方の軌道の軌道名 (0: 自軌道)"),
                this.createParam("trackKey2", "**trackKey2**: 他方の軌道の軌道名"),
            ]
        )

        this.syntaxes.push(
            structure_load,
            structure_put,
            structure_put0,
            structure_putbetween,
        );
        //#endregion
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
    isMatchMapElement1(mapElement1Text: string) : boolean {
        let type = this.syntaxes[0].getSyntaxType();
        if(type === MapSyntaxType.Syntax1) {
            //シンタックス1はキーがない
            return mapElement1Text.match(new RegExp(String.raw`^${this.syntaxes[0].getMapElement1Name()}$`, "i")) !== null;
        }else {
            return mapElement1Text.match(new RegExp(String.raw`^${this.syntaxes[0].getMapElement1Name()}\[.*\]$`, "i")) !== null;
        }
    }

    /**
     * 引数に与えられたマップ要素と一致するか？
     * 全てのシンタックスタイプに対応
     * @param mapElementText マップ要素
     */
    isMatchMapElement(mapElementText: string) : boolean {
        let type = this.syntaxes[0].getSyntaxType();
        if(type === MapSyntaxType.Syntax1 || type === MapSyntaxType.Syntax2) {
            //シンタックス1 or 2の場合はマップ要素1のみの結果を返す
            return this.isMatchMapElement1(mapElementText);
        }else if(type === MapSyntaxType.Syntax3) {
            //シンタックス3の場合はマップ要素1 + マップ要素2の結果を返す
            return mapElementText.match(new RegExp(String.raw`^${this.syntaxes[0].getMapElement1Name()}\[.*\]\.${this.syntaxes[0].getMapElement2Name()}$`, "i")) !== null;
        }

        return false;
    }

    /**
     * 引数に与えられたらマップ構文のシンタックスと一致するか？
     * @param syntaxText マップ構文シンタックス
     */
    isMatchSyntax(syntaxText: string) : boolean {
        switch(this.syntaxes[0].getSyntaxType()) {
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
    getSignatureHelp(paramIdx: number) : vscode.SignatureHelp {
        let ret = new vscode.SignatureHelp();
        let signatures: vscode.SignatureInformation[] = [];
        for(let i in this.syntaxes) {
            let signature = new vscode.SignatureInformation(this.syntaxes[i].getDisplayName(), this.syntaxes[i].getDocument());
            signature.parameters = this.syntaxes[i].getSignatureParams();
            signatures.push(signature);
        }
        
        ret.signatures = signatures.sort((a, b) => a.parameters.length - b.parameters.length); //パラメータ数で昇順ソート
        //パラメータ数からシグネチャを選択
        ret.activeSignature = ret.signatures.length - 1;
        for(var i = ret.signatures.length - 1; i >= 0; i--) {
            if((paramIdx+1) <= ret.signatures[i].parameters.length) {
                ret.activeSignature = i;
            }
        }

        //アクティブパラメータの設定
        ret.activeParameter = paramIdx;
        return ret;
    }

    /**
     * マップ要素2のコード補完アイテムを取得します。(シンタックス3のみ)
     */
    getMapElement2CompletionItem() : vscode.CompletionItem {
        return new vscode.CompletionItem(this.syntaxes[0].getMapElement2Name(), vscode.CompletionItemKind.Function);
    }

    /**
     * 関数名のコード補完アイテムを取得します。
     */
    getFunctionCompletionItem() : vscode.CompletionItem {
        return new vscode.CompletionItem(this.syntaxes[0].getFuncName(), vscode.CompletionItemKind.Function);
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