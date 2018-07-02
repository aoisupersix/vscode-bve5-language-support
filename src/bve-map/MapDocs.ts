'use strict';
import * as vscode from 'vscode';
import { MapDoc, MapSyntaxType, MapParameter } from './mapDoc';

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
     * 全てのマップ要素名
     */
    private mapElements: MapDoc[] = [];

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
                this.createParam("cant", "**cant**: カント [m]"),
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
                this.createParam("cant", "**cant**: カント [m]"),
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

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "Curve", "", "",
            this.convMarkDown("自軌道の平面曲線 (曲率とカント)"), []
        ));

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

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "Gradient", "", "",
            this.convMarkDown("自軌道の勾配"), []
        ));

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

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "Track", "", "",
            this.convMarkDown("他軌道"), []
        ));

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
            MapSyntaxType.Syntax2, "Structure", "", "PutBetween",
            this.convMarkDown("ストラクチャーを現在の距離程の 2 つの軌道の間に設置します。ストラクチャーは、軌道間の距離に応じて変形します。"),
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
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "Structure", "", "",
            this.convMarkDown("ストラクチャー"), []
        ));

        this.syntaxes.push(
            structure_load,
            structure_put,
            structure_put0,
            structure_putbetween,
        );
        //#endregion

        //#region 連続ストラクチャ

        //Repeater[].Begin(trackKey, x, y, z, rx, ry, rz, tilt, span, interval, ...structureKeyN)
        let repeater_begin = new MapDoc(
            MapSyntaxType.Syntax2, "Repeater", "", "Begin",
            this.convMarkDown("ストラクチャーの連続配置を現在の距離程から開始します。ストラクチャーは、軌道に沿って一定間隔に配置されます。"),
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
                this.createParam("interval", "**interval**: 配置間隔 [m]"),
                this.createParam("...structureKeyN", "**structureKeyN**: ストラクチャー名 (ストラクチャーリストファイルで定義した文字列)"),
            ]
        );

        //Repeater[].Begin0(trackKey, tilt, span, interval, ...structureKeyN)
        let repeater_begin0 = new MapDoc(
            MapSyntaxType.Syntax2, "Repeater", "", "Begin0",
            this.convMarkDown("ストラクチャーの連続配置を現在の距離程から開始します。Repeater[].Begin 構文の x, y, z, rx, ry, rz に 0 を設定したことと同じです。"),
            [
                this.createParam("trackKey", "**trackKey**: 配置先の軌道名 (0: 自軌道)"),
                this.createParam("tilt", "**tilt**: 傾斜オプション (0: 常に水平, 1: 勾配に連動, 2: カントに連動, 3: 勾配とカントに連動)"),
                this.createParam("span", "**span**: 曲線における弦の長さ [m]"),
                this.createParam("interval", "**interval**: 配置間隔 [m]"),
                this.createParam("...structureKeyN", "**structureKeyN**: ストラクチャー名 (ストラクチャーリストファイルで定義した文字列)"),
            ]
        );

        //Repeater[].End()
        let repeater_end = new MapDoc(
            MapSyntaxType.Syntax2, "Repeater", "", "End",
            this.convMarkDown("ストラクチャーの連続配置を現在の距離程で終了します。"),
            [
            ]
        );

        //Background.Change(structureKey)
        let background_change = new MapDoc(
            MapSyntaxType.Syntax1, "BackGround", "", "Change",
            this.convMarkDown("背景を変更します。"),
            [
                this.createParam("structureKey", "**structureKey**: ストラクチャー名")
            ]
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "Repeater", "", "",
            this.convMarkDown("連続ストラクチャー"), []
        ));

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "BackGround", "", "",
            this.convMarkDown("背景"), []
        ));

        this.syntaxes.push(
            repeater_begin,
            repeater_begin0,
            repeater_end,
            background_change,
        );
        //#endregion

        //#region 停車場

        //Station.Load(filePath)
        let station_load = new MapDoc(
            MapSyntaxType.Syntax1, "Station", "", "Load",
            this.convMarkDown("停車場リストファイルにもとづいて停車場を定義します。"),
            [
                this.createParam("filePath", "**filePath**: このファイルから停車場リストファイルへの相対パス"),
            ]
        );

        //Station[].Put(door, margin1, margin2)
        let station_put = new MapDoc(
            MapSyntaxType.Syntax2, "Station", "", "Put",
            this.convMarkDown("この列車の停止位置を現在の距離程に設定します。列車停止位置目標ストラクチャーを設置するには Structure.Put を使用してください。"),
            [
                this.createParam("door", "**door**: 開くドアの方向 (-1: 左, 1: 右)"),
                this.createParam("margin1", "**margin1**: 停止位置誤差の後方許容範囲 (負の値で設定)"),
                this.createParam("margin2", "**margin2**: 停止位置誤差の前方許容範囲"),
            ]
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "Station", "", "",
            this.convMarkDown("停車場"), []
        ));

        this.syntaxes.push(
            station_load,
            station_put,
        );

        //#endregion

        //#region 閉そく

        //Section.Begin(signal0, signal1, ...signalN)
        let section_signal = new MapDoc(
            MapSyntaxType.Syntax1, "Section", "", "Begin",
            this.convMarkDown("新しい閉そくを現在の距離程から開始します。"),
            [
                this.createParam("signal0", "**signal0**: 先行列車がこの閉そくに存在する場合の信号インデックス"),
                this.createParam("signal1", "**signal0**: 先行列車が 1 閉そく先に存在する場合の信号インデックス"),
                this.createParam("...signalN", "**signalN**: 先行列車が N 閉そく先に存在する場合の信号インデックス"),
            ]
        );

        //Section.SetSpeedLimit(v0, v1, ...vN)
        let section_setspeedlimit = new MapDoc(
            MapSyntaxType.Syntax1, "Section", "", "SetSpeedLimit",
            this.convMarkDown("信号現示の許容速度を設定します。"),
            [
                this.createParam("signal0", "**signal0**: 走行速度 [km/h] (null: 許容速度なし)"),
                this.createParam("signal1", "**signal0**: 走行速度 [km/h] (null: 許容速度なし)"),
                this.createParam("...signalN", "**signalN**: 走行速度 [km/h] (null: 許容速度なし)"),
            ]
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "Section", "", "",
            this.convMarkDown("閉そく"), []
        ));

        this.syntaxes.push(
            section_signal,
            section_setspeedlimit
        );

        //#endregion 閉そく

        //#region 地上信号機

        //Signal.Load(filePath)
        let signal_load = new MapDoc(
            MapSyntaxType.Syntax1, "Signal", "", "Load",
            this.convMarkDown("信号現示リストファイルにもとづいて信号現示を定義します。"),
            [
                this.createParam("filePath", "**filePath**: このファイルから信号現示リストファイルへの相対パス"),
            ]
        );

        //Signal.Put(section, trackKey, x, y)
        let signal_put = new MapDoc(
            MapSyntaxType.Syntax2, "Signal", "", "Put",
            this.convMarkDown("地上信号機を現在の距離程に設置します。"),
            [
                this.createParam("section", "**section**: 関連づける閉そくの相対インデックス"),
                this.createParam("trackKey", "**trackKey**: 配置先の軌道名"),
                this.createParam("x", "**x**: 軌道からの x 座標 [m]"),
                this.createParam("y", "**y**: 軌道からの y 座標 [m]"),
            ]
        );

        //Signal.Put(section, trackKey, x, y, z, rx, ry, rz, tilt, span)
        signal_put.addSyntax(
            this.convMarkDown("地上信号機を現在の距離程に設置します。"),
            [
                this.createParam("section", "**section**: 関連づける閉そくの相対インデックス"),
                this.createParam("trackKey", "**trackKey**: 配置先の軌道名"),
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

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "Signal", "", "",
            this.convMarkDown("地上信号機"), []
        ));

        this.syntaxes.push(
            signal_load,
            signal_put,
        );

        //#endregion

        //#region 地上子

        //Beacon.Put(type, section, sendData)
        let beacon_put = new MapDoc(
            MapSyntaxType.Syntax1, "Beacon", "", "Put",
            this.convMarkDown("地上子の送信イベントを現在の距離程に定義します。地上子ストラクチャーを設置するには Structure[].Put 構文を使用してください。"),
            [
                this.createParam("type", "**type**: 保安装置に送る地上子種別 (整数)"),
                this.createParam("section", "**section**: 関連づける閉そくの相対インデックス"),
                this.createParam("sendData", "**sendData**: 保安装置に送る値 (整数)"),
            ]
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "Beacon", "", "",
            this.convMarkDown("地上子"), []
        ));

        this.syntaxes.push(beacon_put);

        //#endregion

        //#region 速度制限

        //SpeedLimit.Begin(v)
        let speedlimit_begin = new MapDoc(
            MapSyntaxType.Syntax1, "SpeedLimit", "", "Begin",
            this.convMarkDown("速度制限を現在の距離程から開始します。速度制限標識ストラクチャーを設置するには Structure.Put 構文を使用してください。"),
            [
                this.createParam("v", "**v**: 走行速度 [km/h]"),
            ]
        );

        //SpeedLimit.End()
        let speedlimit_end = new MapDoc(
            MapSyntaxType.Syntax1, "SpeedLimit", "", "End",
            this.convMarkDown("速度制限を現在の距離程で終了します。速度制限解除標識ストラクチャーを設置するには Structure.Put 構文を使用してください。"),
            [
            ]
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "SppedLimit", "", "",
            this.convMarkDown("速度制限"), []
        ));

        this.syntaxes.push(
            speedlimit_begin,
            speedlimit_end,
        );

        //#endregion

        //#region 先行列車

        //PreTrain.Pass(time)
        let pretrain_pass = new MapDoc(
            MapSyntaxType.Syntax1, "PreTrain", "", "Pass",
            this.convMarkDown("先行列車が現在の距離程を通過する時刻を設定します。"),
            [
                this.createParam("time", "**time**: 時刻を表す文字列 ('hh:mm:ss')")
            ]
        )
        //PreTrain.Pass(second)
        pretrain_pass.addSyntax(
            this.convMarkDown("先行列車が現在の距離程を通過する時刻を設定します。"),
            [
                this.createParam("second", "**second**: 00:00:00 からの経過時間 [sec]")
            ]
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "PreTrain", "", "",
            this.convMarkDown("先行列車"), []
        ));

        this.syntaxes.push(pretrain_pass);

        //#endregion 先行列車

        //#region 光源

        //Light.Ambient(red, green, blue)
        let light_ambient = new MapDoc(
            MapSyntaxType.Syntax1, "Light", "", "Ambient",
            this.convMarkDown("環境光の色 (アンビエント色) を設定します。この構文は、マップファイルに 1 回のみ記述可能です。"),
            [
                this.createParam("red", "**red**: 赤成分 (0 ~ 1)"),
                this.createParam("green", "**green**: 緑成分 (0 ~ 1)"),
                this.createParam("blue", "**blue**: 青成分 (0 ~ 1)"),
            ]
        );

        //Light.Diffuse(red, green, blue)
        let light_diffuse = new MapDoc(
            MapSyntaxType.Syntax1, "Light", "", "Diffuse",
            this.convMarkDown("平行光の色 (ディフューズ色) を設定します。この構文は、マップファイルに 1 回のみ記述可能です。"),
            [
                this.createParam("red", "**red**: 赤成分 (0 ~ 1)"),
                this.createParam("green", "**green**: 緑成分 (0 ~ 1)"),
                this.createParam("blue", "**blue**: 青成分 (0 ~ 1)"),
            ]
        );

        //Light.Direction(pitch, yaw)
        let light_direction = new MapDoc(
            MapSyntaxType.Syntax1, "Light", "", "Direction",
            this.convMarkDown("距離程 0 において、平行光が指す方向を設定します。この構文は、マップファイルに 1 回のみ記述可能です。"),
            [
                this.createParam("pitch", "**pitch**: 平行光のピッチ角 [deg]"),
                this.createParam("yaw", "**yaw**: 平行光のヨー角 [deg]"),
            ]
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "Light", "", "",
            this.convMarkDown("光源"), []
        ));

        this.syntaxes.push(
            light_ambient,
            light_diffuse,
            light_direction
        );

        //#endregion

        //#region 霧効果

        //Fog.Interpolate(density, red, green, blue)
        let fog_interpolate = new MapDoc(
            MapSyntaxType.Syntax1, "Fog", "", "Interpolate",
            this.convMarkDown("現在の距離程における霧効果を設定します。2 つの Fog.Interpolate の間は線形補間されます。"),
            [
                this.createParam("density", "**density**: 濃度"),
                this.createParam("red", "**red**: 赤成分 (0 ~ 1)"),
                this.createParam("green", "**green**: 緑成分 (0 ~ 1)"),
                this.createParam("blue", "**blue**: 青成分 (0 ~ 1)"),
            ]
        );
        //Fog.Interpolate(density)
        fog_interpolate.addSyntax(
            this.convMarkDown("現在の距離程における霧効果を設定します。2 つの Fog.Interpolate の間は線形補間されます。"),
            [
                this.createParam("density", "**density**: 濃度"),
            ]
        );
        fog_interpolate.addSyntax(
            this.convMarkDown("現在の距離程における霧効果を設定します。2 つの Fog.Interpolate の間は線形補間されます。"),
            [
            ]
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "Fog", "", "",
            this.convMarkDown("霧効果"), []
        ));

        this.syntaxes.push(fog_interpolate);

        //#endregion

        //#region 風景描画距離

        //DrawDistance.Change(value)
        let drawdistance_change = new MapDoc(
            MapSyntaxType.Syntax1, "DrawDistance", "", "Change",
            this.convMarkDown("現在の距離程以降の風景の描画距離を設定します。[設定] ウィンドウで設定される描画距離と、ここで設定する描画距離の短い方が適用されます。"),
            [
                this.createParam("value", "**value**: 距離 [m] (0: [設定] ウィンドウで設定される描画距離を適用)")
            ]
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "DrawDistance", "", "",
            this.convMarkDown("風景描画距離"), []
        ));

        this.syntaxes.push(drawdistance_change);

        //#endregion

        //#region 運転台の明るさ

        //CabIlluminance.Interpolate(value)
        let cab_interpolate = new MapDoc(
            MapSyntaxType.Syntax1, "CabIlluminance", "", "Interpolate",
            this.convMarkDown("現在の距離程における運転台の明るさを設定します。2 つの CabIlluminance.Interpolate の間は線形補間されます。"),
            [
                this.createParam("value", "**value**: 昼間画像と夜間画像の混合比 (0: 夜間画像 ~ 1: 昼間画像)")
            ]
        );
        //CabIlluminance.Interpolate()
        cab_interpolate.addSyntax(
            this.convMarkDown("現在の距離程における運転台の明るさを設定します。2 つの CabIlluminance.Interpolate の間は線形補間されます。"),
            [
            ]
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "CabIlluminance", "", "",
            this.convMarkDown("運転台の明るさ"), []
        ));

        this.syntaxes.push(cab_interpolate);

        //#endregion

        //#region 軌道変位

        //Irregularity.Change(x, y, r, lx, ly, lr)
        let irregularity_change = new MapDoc(
            MapSyntaxType.Syntax1, "Irregularity", "", "Change",
            this.convMarkDown("現在の距離程以降の軌道変位を設定します。"),
            [
                this.createParam("x", "**x**: 左右変位 (左と右のレールの通り変位の平均に相当) の標準偏差 [m]"),
                this.createParam("y", "**y**: 上下変位 (左と右のレールの高低変位の平均に相当) の標準偏差 [m]"),
                this.createParam("r", "**r**: ロール変位 (水準変位を軌間で除した値に相当) の標準偏差 [rad]"),
                this.createParam("lx", "**lx**: 左右変位の遮断波長 [m]"),
                this.createParam("ly", "**ly**: 上下変位の遮断波長 [m]"),
                this.createParam("lr", "**lr**: ロール変位の遮断波長 [m]"),
            ]
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "Irregularity", "", "",
            this.convMarkDown("軌道変位"), []
        ));

        this.syntaxes.push(irregularity_change);

        //#endregion

        //#region 粘着特性

        //Adhesion.Change(a)
        let adhesion_change = new MapDoc(
            MapSyntaxType.Syntax1, "Adhesion", "", "Change",
            this.convMarkDown("現在の距離程以降の車輪-レール間の粘着特性を設定します。"),
            [
                this.createParam("a", "**a**: 走行速度 0 km/h における粘着係数"),
            ]
        );
        //Adhesion.Change(a,b,c)
        adhesion_change.addSyntax(
            this.convMarkDown("現在の距離程以降の車輪-レール間の粘着特性を設定します。"),
            [
                this.createParam("a", "**a**: 走行速度 0 km/h における粘着係数"),
                this.createParam("b", "**b**: 粘着係数の走行速度に対する変化を表す係数"),
                this.createParam("c", "**c**: 粘着係数の走行速度に対する変化を表す係数"),
            ]
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "Adhesion", "", "",
            this.convMarkDown("粘着特性"), []
        ));

        this.syntaxes.push(adhesion_change);

        //#endregion

        //#region 音

        //Sound.Load(filePath)
        let sound_load = new MapDoc(
            MapSyntaxType.Syntax1, "Sound", "", "Load",
            this.convMarkDown("サウンドリストファイルにもとづいてサウンドを読み込みます。"),
            [
                this.createParam("filePath", "**filePath**: このファイルからサウンドリストファイルへの相対パス"),
            ]
        );

        //Sound[].Play()
        let sound_play = new MapDoc(
            MapSyntaxType.Syntax2, "Sound", "", "Play",
            this.convMarkDown("現在の距離程を通過するときにサウンドを 1 回再生します。"),
            [
            ]
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "Sound", "", "",
            this.convMarkDown("音"), []
        ));

        this.syntaxes.push(
            sound_load,
            sound_play,
        );

        //#endregion

        //#region 固定音源

        //Sound3D.Load(filePath)
        let sound3d_load = new MapDoc(
            MapSyntaxType.Syntax1, "Sound3D", "", "Load",
            this.convMarkDown("サウンドリストファイルにもとづいてサウンドを読み込みます。"),
            [
                this.createParam("filePath", "**filePath**: このファイルからサウンドリストファイルへの相対パス"),
            ]
        );

        //Sound3D[].Put(x, y)
        let sound3d_put = new MapDoc(
            MapSyntaxType.Syntax2, "Sound3D", "", "Put",
            this.convMarkDown("地上に固定された音源を現在の距離程に設置します。サウンドは連続再生されます。"),
            [
                this.createParam("x", "**x**: 軌道からの x 座標 [m]"),
                this.createParam("y", "**y**: 軌道からの y 座標 [m]"),
            ]
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "Sound3D", "", "",
            this.convMarkDown("固定音源"), []
        ));

        this.syntaxes.push(
            sound3d_load,
            sound3d_put,
        );

        //#endregion

        //#region 走行音

        //RollingNoise.Change(index)
        let rollingnoise_change = new MapDoc(
            MapSyntaxType.Syntax1, "RollingNoise", "", "Change",
            this.convMarkDown("現在の距離程以降の車輪転動音を設定します。"),
            [
                this.createParam("index", "**index**: 車両サウンドファイルの [Run] セクションで定義したインデックス")
            ]
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "RollingNoise", "", "",
            this.convMarkDown("走行音"), []
        ));

        this.syntaxes.push(rollingnoise_change);

        //#endregion

        //#region フランジきしり音

        //FlangeNoise.Change(index)
        let flangenoise_change = new MapDoc(
            MapSyntaxType.Syntax1, "FlangeNoise", "", "Change",
            this.convMarkDown("現在の距離程以降のフランジきしり音を設定します。"),
            [
                this.createParam("index", "**index**: 車両サウンドファイルの [Flange] セクションで定義したインデックス")
            ]
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "FlangeNoise", "", "",
            this.convMarkDown("フランジきしり音"), []
        ));

        this.syntaxes.push(flangenoise_change);

        //#endregion

        //#region 分岐器通過音

        //JointNoise.Play(index)
        let jointnoise_play = new MapDoc(
            MapSyntaxType.Syntax1, "JointNoise", "", "Play",
            this.convMarkDown("現在の距離程を通過するときに分岐器通過音を走行速度に応じて再生します。"),
            [
                this.createParam("index", "**index**: 車両サウンドファイルの [Joint] セクションで定義したインデックス")
            ]
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "JointNoise", "", "",
            this.convMarkDown("分岐器通過音"), []
        ));

        this.syntaxes.push(jointnoise_play);

        //#endregion

        //#region 他列車

        //Train.Add(trainKey, filePath, trackKey, direction)
        let train_add = new MapDoc(
            MapSyntaxType.Syntax1, "Train", "", "Add",
            this.convMarkDown("他列車ファイルにもとづいて他列車を定義します。"),
            [
                this.createParam("trainKey", "**trainKey**: 他列車名 (任意の文字列)"),
                this.createParam("filePath", "**filePath**: このファイルから他列車ファイルへの相対パス"),
                this.createParam("trackKey", "**trackKey**: 走行する軌道"),
                this.createParam("direction", "**direction**: 進行方向 (-1: 対向, 1: 並走)"),
            ]
        );

        //Train[trainKey].Load(filePath, trackKey, direction)
        let train_load = new MapDoc(
            MapSyntaxType.Syntax2, "Train", "", "Load",
            this.convMarkDown("他列車ファイルにもとづいて他列車を定義します。"),
            [
                this.createParam("filePath", "**filePath**: このファイルから他列車ファイルへの相対パス"),
                this.createParam("trackKey", "**trackKey**: 走行する軌道"),
                this.createParam("direction", "**direction**: 進行方向 (-1: 対向, 1: 並走)"),
            ]
        );

        //Train[].Enable(time)
        let train_enable = new MapDoc(
            MapSyntaxType.Syntax2, "Train", "", "Enable",
            this.convMarkDown("自列車が現在の距離程を通過し、かつ設定された時刻になったとき、他列車の動作を有効にします。"),
            [
                this.createParam("time", "**time**: 時刻を表す文字列 ('hh:mm:ss')"),
            ]
        );
        //Train[].Enable(second)
        train_enable.addSyntax(
            this.convMarkDown("自列車が現在の距離程を通過し、かつ設定された時刻になったとき、他列車の動作を有効にします。"),
            [
                this.createParam("second", "**second**: 00:00:00 からの経過時間 [sec]"),
            ]
        );

        //Train[].Stop(decelerate, stopTime, accelerate, speed)
        let train_stop = new MapDoc(
            MapSyntaxType.Syntax2, "Train", "", "Stop",
            this.convMarkDown("他列車を現在の距離程に一旦停車させます。"),
            [
                this.createParam("decelerate", "**decelerate**: 減速度 [km/h/s]"),
                this.createParam("stopTime", "**stopTime**: 停車時間 [s]"),
                this.createParam("accelerate", "**accelerate**: 加速度 [km/h/s]"),
                this.createParam("speed", "**speed**: 加速後の走行速度 [km/h]"),
            ]
        );

        this.mapElements.push(new MapDoc(
            MapSyntaxType.Syntax1, "Train", "", "",
            this.convMarkDown("他列車"), []
        ));

        this.syntaxes.push(
            train_add,
            train_load,
            train_enable,
            train_stop,
        );

        //#endregion
    }


    /**
     * 引数に与えられたステータスからパラメータを生成します。
     * @param name パラメータ名
     * @param documentString パラメータの説明
     */
    private createParam(name: string, documentString: string): MapParameter {
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

    /**
     * 全てのマップ要素名を取得します。
     */
    getMapElements() {
        return this.mapElements;
    }
}

