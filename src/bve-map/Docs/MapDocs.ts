'use strict'

import * as vscode from 'vscode'

import { MapDoc, MapSyntaxType } from './MapDoc'
import { MapParameter } from './MapParameter'

/**
 * マップ構文を管理するシングルトンクラス
 */
export class MapDocs {
  /**
   * インスタンス
   */
  private static instance: MapDocs

  /**
   * 全てのマップ構文
   */
  private syntaxes: MapDoc[] = []

  /**
   * 全てのマップ要素名
   */
  private mapElements: MapDoc[] = []

  /**
   * デフォルトのコンストラクタ
   * ここで構文の定義を行う
   */
  private constructor() {
    // #region カーブ
    // Curve.SetGauge(value)
    const curveSetgauge = new MapDoc(
      MapSyntaxType.Syntax1,
      'Curve',
      '',
      'SetGauge',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降の軌間を設定します。この値は、カントを角度に換算するために使用します。'
      ),
      [this.createParam('value', '**value**: 軌間 [m]')]
    )

    // Curve.SetCenter(x)
    const curveSetcenter = new MapDoc(
      MapSyntaxType.Syntax1,
      'Curve',
      '',
      'SetGauge',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降のカントの回転中心位置を設定します。'
      ),
      [this.createParam('x', '**x**: 軌間 [m]')]
    )

    // Curve.SetFunction(id)
    const curveSetfunction = new MapDoc(
      MapSyntaxType.Syntax1,
      'Curve',
      '',
      'SetFunction',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降の緩和曲線関数を設定します。'
      ),
      [
        this.createParam(
          'id',
          '**id**: 関数番号 (0: サイン半波長逓減, 1: 直線逓減)'
        )
      ]
    )

    // Curve.BeginTransition()
    const curveBegintransition = new MapDoc(
      MapSyntaxType.Syntax1,
      'Curve',
      '',
      'BeginTransition',
      this.convMarkDown(
        '平面曲線の緩和曲線を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。'
      ),
      []
    )

    // Curve.Begin(radius, cant)
    const curveBegin = new MapDoc(
      MapSyntaxType.Syntax1,
      'Curve',
      '',
      'Begin',
      this.convMarkDown(
        '平面曲線の円曲線を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。カントを設定する場合は、この手前に Curve.BeginTransition を記述する必要があります。'
      ),
      [
        this.createParam(
          'radius',
          '**radius**: 曲線半径 [m] (正: 右曲線, 負: 左曲線)'
        ),
        this.createParam('cant', '**cant**: カント [m]')
      ]
    )
    // Curve.Begin2(radius)
    curveBegin.addSyntax(
      this.convMarkDown(
        '平面曲線の円曲線を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。'
      ),
      [
        this.createParam(
          'radius',
          '**radius**: 曲線半径 [m] (正: 右曲線, 負: 左曲線)'
        )
      ]
    )
    // Curve.Begin()
    curveBegin.addSyntax(
      this.convMarkDown(
        '平面曲線の円曲線を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。'
      ),
      []
    )

    // Curve.End()
    const curveEnd = new MapDoc(
      MapSyntaxType.Syntax1,
      'Curve',
      '',
      'End',
      this.convMarkDown(
        '平面曲線を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)で終了し、直線を開始します。'
      ),
      []
    )

    // Curve.Interpolate(radius, cant)
    const curveInterpolate = new MapDoc(
      MapSyntaxType.Syntax1,
      'Curve',
      '',
      'Interpolate',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における平面曲線の半径とカントを設定します。1 つ手前の Curve.Interpolate または Curve.Change の間は補間されます。補間関数は、Curve.SetFunction で設定します。'
      ),
      [
        this.createParam(
          'radius',
          '**radius**: 曲線半径 [m] (正: 右曲線, 負: 左曲線, 0: 直線)'
        ),
        this.createParam('cant', '**cant**: カント [m]')
      ]
    )
    // Curve.Interpolate(radius)
    curveInterpolate.addSyntax(
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における平面曲線の半径とカントを設定します。1 つ手前の Curve.Interpolate または Curve.Change の間は補間されます。補間関数は、Curve.SetFunction で設定します。引数を省略した場合、1 つ手前の Curve.Interpolate の値が使用されます。'
      ),
      [
        this.createParam(
          'radius',
          '**radius**: 曲線半径 [m] (正: 右曲線, 負: 左曲線, 0: 直線)'
        )
      ]
    )
    // Curve.Interpolate()
    curveInterpolate.addSyntax(
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における平面曲線の半径とカントを設定します。1 つ手前の Curve.Interpolate または Curve.Change の間は補間されます。補間関数は、Curve.SetFunction で設定します。引数を省略した場合、1 つ手前の Curve.Interpolate の値が使用されます。'
      ),
      []
    )

    // Curve.Change(radius)
    const curveChange = new MapDoc(
      MapSyntaxType.Syntax1,
      'Curve',
      '',
      'Change',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降の平面曲線の半径を設定します。Curve.Begin(radius) と同等です。'
      ),
      [
        this.createParam(
          'id',
          '**id**: 曲線半径 [m] (正: 右曲線, 負: 左曲線, 0: 直線)'
        )
      ]
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'Curve',
        '',
        '',
        this.convMarkDown('自軌道の平面曲線 (曲率とカント)'),
        []
      )
    )

    this.syntaxes.push(
      curveSetgauge,
      curveSetcenter,
      curveSetfunction,
      curveBegintransition,
      curveBegin,
      curveEnd,
      curveInterpolate,
      curveChange
    )
    //#endregion

    //#region 自軌道の勾配

    // Gradient.BeginTransition()
    const gradientBegintransition = new MapDoc(
      MapSyntaxType.Syntax1,
      'Gradient',
      '',
      'BeginTransition',
      this.convMarkDown(
        '縦曲線を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。'
      ),
      []
    )

    // Gradient.Begin(gradient)
    const gradientBegin = new MapDoc(
      MapSyntaxType.Syntax1,
      'Gradient',
      '',
      'Begin',
      this.convMarkDown(
        '縦曲線を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)で終了し、勾配を一定に保ちます。'
      ),
      [this.createParam('gradient', '**gradient**: 勾配 [‰]')]
    )

    // Gradient.End()
    const gradientEnd = new MapDoc(
      MapSyntaxType.Syntax1,
      'Gradient',
      '',
      'End',
      this.convMarkDown(
        '勾配を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)で終了し、レベル (水平) を開始します。'
      ),
      []
    )

    // Gradient.Interpolate(gradient)
    const gradientInterpolate = new MapDoc(
      MapSyntaxType.Syntax1,
      'Gradient',
      '',
      'Interpolate',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における勾配を設定します。2 つの Gradient.Interpolate の間の勾配は線形補間されます。'
      ),
      [this.createParam('gradient', '**gradient**: 勾配 [‰]')]
    )
    // Gradient.Interpolate()
    gradientInterpolate.addSyntax(
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における勾配を設定します。2 つの Gradient.Interpolate の間の勾配は線形補間されます。引数を省略した場合、1 つ手前の Gradient.Interpolate の値が使用されます。'
      ),
      []
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'Gradient',
        '',
        '',
        this.convMarkDown('自軌道の勾配'),
        []
      )
    )

    this.syntaxes.push(
      gradientBegintransition,
      gradientBegin,
      gradientEnd,
      gradientInterpolate
    )

    //#endregion

    //#region 他軌道

    // Track[].X.Interpolate(x, radius)
    const trackInterpolate = new MapDoc(
      MapSyntaxType.Syntax3,
      'Track',
      'X',
      'Interpolate',
      this.convMarkDown(
        '現在の[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における他軌道の x 方向位置を設定します。2 つの Track[].X.Interpolate との間の x 座標は補間されます。引数が省略された場合、1 つ手前の Track[].X.Interpolate の値が使用されます。'
      ),
      [
        this.createParam('x', '**x**: 自軌道からの x 座標 [m]'),
        this.createParam(
          'radius',
          '**radius**: [現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降の自軌道との平面曲線相対半径 [m] (0: 直線)'
        )
      ]
    )
    // Track[].X.Interpolate(x)
    trackInterpolate.addSyntax(
      this.convMarkDown(
        '現在の[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における他軌道の x 方向位置を設定します。2 つの Track[].X.Interpolate との間の x 座標は補間されます。引数が省略された場合、1 つ手前の Track[].X.Interpolate の値が使用されます。'
      ),
      [this.createParam('x', '**x**: 自軌道からの x 座標 [m]')]
    )
    // Track[].X.Interpolate()
    trackInterpolate.addSyntax(
      this.convMarkDown(
        '現在の[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における他軌道の x 方向位置を設定します。2 つの Track[].X.Interpolate との間の x 座標は補間されます。引数が省略された場合、1 つ手前の Track[].X.Interpolate の値が使用されます。'
      ),
      []
    )

    // Track[].Y.Interpolate(x, radius)
    const trackYInterpolate = new MapDoc(
      MapSyntaxType.Syntax3,
      'Track',
      'Y',
      'Interpolate',
      this.convMarkDown(
        '現在の[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における他軌道の y 方向位置を設定します。2 つの Track[].Y.Interpolate との間の y 座標は補間されます。引数が省略された場合、1 つ手前の Track[].Y.Interpolate の値が使用されます。'
      ),
      [
        this.createParam('y', '**y**: 自軌道からの y 座標 [m]'),
        this.createParam(
          'radius',
          '**radius**: [現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降の自軌道との縦曲線相対半径 [m] (0: 直線)'
        )
      ]
    )
    // Track[].Y.Interpolate(x)
    trackYInterpolate.addSyntax(
      this.convMarkDown(
        '現在の[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における他軌道の y 方向位置を設定します。2 つの Track[].Y.Interpolate との間の y 座標は補間されます。引数が省略された場合、1 つ手前の Track[].Y.Interpolate の値が使用されます。'
      ),
      [this.createParam('y', '**y**: 自軌道からの y 座標 [m]')]
    )
    // Track[].Y.Interpolate()
    trackYInterpolate.addSyntax(
      this.convMarkDown(
        '現在の[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における他軌道の y 方向位置を設定します。2 つの Track[].Y.Interpolate との間の y 座標は補間されます。引数が省略された場合、1 つ手前の Track[].Y.Interpolate の値が使用されます。'
      ),
      []
    )

    // Track[].Position(x, y, radiusH, radiusV)
    const trackPosition = new MapDoc(
      MapSyntaxType.Syntax2,
      'Track',
      '',
      'Position',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における他軌道の位置を設定します。Track[].X.Interpolate と Track[].Y.Interpolate を同時に記述することと同等です。'
      ),
      [
        this.createParam('x', '**x**: 自軌道からの x 座標 [m]'),
        this.createParam('y', '**y**: 自軌道からの y 座標 [m]'),
        this.createParam(
          'radiusH',
          '**radiusH**: [現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降の自軌道との平面曲線相対半径 [m] (0: 直線)'
        ),
        this.createParam(
          'radiusV',
          '**radiusV**: [現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降の自軌道との縦曲線相対半径 [m] (0: 直線)'
        )
      ]
    )
    // Track[].Position(x, y, radiusH)
    trackPosition.addSyntax(
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における他軌道の位置を設定します。Track[].X.Interpolate と Track[].Y.Interpolate を同時に記述することと同等です。ただし、引数が省略された場合、0 が代入されます。'
      ),
      [
        this.createParam('x', '**x**: 自軌道からの x 座標 [m]'),
        this.createParam('y', '**y**: 自軌道からの y 座標 [m]'),
        this.createParam(
          'radiusH',
          '**radiusH**: [現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降の自軌道との平面曲線相対半径 [m] (0: 直線)'
        )
      ]
    )
    // Track[].Position(x, y)
    trackPosition.addSyntax(
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における他軌道の位置を設定します。Track[].X.Interpolate と Track[].Y.Interpolate を同時に記述することと同等です。ただし、引数が省略された場合、0 が代入されます。'
      ),
      [
        this.createParam('x', '**x**: 自軌道からの x 座標 [m]'),
        this.createParam('y', '**y**: 自軌道からの y 座標 [m]')
      ]
    )

    // Track[].Cant.SetGauge(gauge)
    const trackCantSetgauge = new MapDoc(
      MapSyntaxType.Syntax3,
      'Track',
      'Cant',
      'SetGauge',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降の他軌道の軌間を設定します。この値は、カントを角度に換算するために使用します。'
      ),
      [this.createParam('gauge', '**gauge**: 軌間 [m]')]
    )

    // Track[].Cant.SetCenter(x)
    const trackCantSetcenter = new MapDoc(
      MapSyntaxType.Syntax3,
      'Track',
      'Cant',
      'SetCenter',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降の他軌道のカントの回転中心位置を設定します。'
      ),
      [
        this.createParam(
          'x',
          '**x**: 回転中心の x 座標 [m] (正: 曲線の内側, 負: 曲線の外側)'
        )
      ]
    )

    // Track[].Cant.SetFunction(id)
    const trackCantSetfunction = new MapDoc(
      MapSyntaxType.Syntax3,
      'Track',
      'Cant',
      'SetFunction',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降の他軌道のカント逓減関数を設定します。'
      ),
      [
        this.createParam(
          'id',
          '**id**: 関数番号 (0: サイン半波長逓減, 1: 直線逓減)'
        )
      ]
    )

    // Track[].Cant.BeginTransition()
    const trackCantBegintransition = new MapDoc(
      MapSyntaxType.Syntax3,
      'Track',
      'Cant',
      'BeginTransition',
      this.convMarkDown(
        '他軌道のカントの逓減を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。'
      ),
      []
    )

    // Track[].Cant.Begin(cant)
    const trackCantBegin = new MapDoc(
      MapSyntaxType.Syntax3,
      'Track',
      'Cant',
      'Begin',
      this.convMarkDown(
        '他軌道のカントの逓減を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)で終了し、カントを一定に保ちます。'
      ),
      [
        this.createParam(
          'cant',
          '**cant**: カント [m] (正: 右に傾ける, 負: 左に傾ける)'
        )
      ]
    )

    // Track[].Cant.End()
    const trackCantEnd = new MapDoc(
      MapSyntaxType.Syntax3,
      'Track',
      'Cant',
      'End',
      this.convMarkDown(
        '他軌道のカントを[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)で終了します。'
      ),
      []
    )

    // Track[].Cant.Interpolate(cant)
    const trackCantInterpolate = new MapDoc(
      MapSyntaxType.Syntax3,
      'Track',
      'Cant',
      'Interpolate',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における他軌道のカントを設定します。2 つの Track[].Cant.Interpolate の間のカントは補間されます。補間関数は、Track[].Cant.SetFunction で設定します。'
      ),
      [
        this.createParam(
          'cant',
          '**cant**: カント [m] (正: 右に傾ける, 負: 左に傾ける)'
        )
      ]
    )

    // Track[].Cant.Interpolate()
    trackCantInterpolate.addSyntax(
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における他軌道のカントを設定します。2 つの Track[].Cant.Interpolate の間のカントは補間されます。補間関数は、Track[].Cant.SetFunction で設定します。引数を省略した場合、1 つ手前の Track[].Cant.Interpolate の値が使用されます。'
      ),
      []
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'Track',
        '',
        '',
        this.convMarkDown('他軌道'),
        []
      )
    )

    this.syntaxes.push(
      trackInterpolate,
      trackInterpolate,
      trackPosition,
      trackCantSetgauge,
      trackCantSetcenter,
      trackCantSetfunction,
      trackCantBegintransition,
      trackCantBegin,
      trackCantEnd,
      trackCantInterpolate
    )
    //#endregion

    //#region ストラクチャ

    // Structure.Load(filePath)
    const structureLoad = new MapDoc(
      MapSyntaxType.Syntax1,
      'Structure',
      '',
      'Load',
      this.convMarkDown(
        '[ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)にもとづいてストラクチャーを読み込みます。ストラクチャーを使用する前にこの構文を記述する必要があります。'
      ),
      [
        this.createParam(
          'filePath',
          '**filePath**: このファイルから[ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)への相対パス'
        )
      ]
    )

    // Structure.Put(trackKey, x, y, z, rx, ry, rz, tilt, span)
    const structurePut = new MapDoc(
      MapSyntaxType.Syntax2,
      'Structure',
      '',
      'Put',
      this.convMarkDown('ストラクチャーを設置します。'),
      [
        this.createParam(
          'trackKey',
          '**trackKey**: 配置先の軌道名 (0: 自軌道)'
        ),
        this.createParam('x', '**x**: 軌道からの x 座標 [m]'),
        this.createParam('y', '**y**: 軌道からの y 座標 [m]'),
        this.createParam(
          'z',
          '**z**: [現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)からの z 座標 [m]'
        ),
        this.createParam('rx', '**rx**: 軌道に対する x 軸回りの角 [deg]'),
        this.createParam('ry', '**ry**: 軌道に対する y 軸回りの角 [deg]'),
        this.createParam('rz', '**rz**: 軌道に対する z 軸回りの角 [deg]'),
        this.createParam(
          'tilt',
          '**tilt**: 傾斜オプション (0: 常に水平, 1: 勾配に連動, 2: カントに連動, 3: 勾配とカントに連動)'
        ),
        this.createParam('span', '**span**: 曲線における弦の長さ [m]')
      ]
    )

    // Structure.Put0(trackKey, tilt, span)
    const structurePut0 = new MapDoc(
      MapSyntaxType.Syntax2,
      'Structure',
      '',
      'Put0',
      this.convMarkDown(
        'ストラクチャーを設置します。Structure[].Put 構文の x, y, z, rx, ry, rz に 0 を設定したことと同じです。'
      ),
      [
        this.createParam(
          'trackKey',
          '**trackKey**: 配置先の軌道名 (0: 自軌道)'
        ),
        this.createParam(
          'tilt',
          '**tilt**: 傾斜オプション (0: 常に水平, 1: 勾配に連動, 2: カントに連動, 3: 勾配とカントに連動)'
        ),
        this.createParam('span', '**span**: 曲線における弦の長さ [m]')
      ]
    )

    // Structure.PutBetween(trackKey1, trackKey2, flag)
    const structurePutbetween = new MapDoc(
      MapSyntaxType.Syntax2,
      'Structure',
      '',
      'PutBetween',
      this.convMarkDown(
        'ストラクチャーを[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)の 2 つの軌道の間に設置します。ストラクチャーは、軌道間の距離に応じて変形します。'
      ),
      [
        this.createParam(
          'trackKey1',
          '**trackKey1**: 一方の軌道の軌道名 (0: 自軌道)'
        ),
        this.createParam('trackKey2', '**trackKey2**: 他方の軌道の軌道名'),
        this.createParam(
          'flag',
          '**flag**: 変形方向 (0: x および y 方向に変形, 1: x 方向のみに変形)'
        )
      ]
    )

    // Structure.PutBetween(trackKey1, trackKey2)
    structurePutbetween.addSyntax(
      this.convMarkDown(
        'ストラクチャーを[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)の 2 つの軌道の間に設置します。ストラクチャーは、軌道間の距離に応じて変形します。'
      ),
      [
        this.createParam(
          'trackKey1',
          '**trackKey1**: 一方の軌道の軌道名 (0: 自軌道)'
        ),
        this.createParam('trackKey2', '**trackKey2**: 他方の軌道の軌道名')
      ]
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'Structure',
        '',
        '',
        this.convMarkDown('ストラクチャー'),
        []
      )
    )

    this.syntaxes.push(
      structureLoad,
      structurePut,
      structurePut0,
      structurePutbetween
    )
    //#endregion

    //#region 連続ストラクチャ

    // Repeater[].Begin(trackKey, x, y, z, rx, ry, rz, tilt, span, interval, ...structureKeyN)
    const repeaterBegin = new MapDoc(
      MapSyntaxType.Syntax2,
      'Repeater',
      '',
      'Begin',
      this.convMarkDown(
        'ストラクチャーの連続配置を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。ストラクチャーは、軌道に沿って一定間隔に配置されます。'
      ),
      [
        this.createParam(
          'trackKey',
          '**trackKey**: 配置先の軌道名 (0: 自軌道)'
        ),
        this.createParam('x', '**x**: 軌道からの x 座標 [m]'),
        this.createParam('y', '**y**: 軌道からの y 座標 [m]'),
        this.createParam(
          'z',
          '**z**: [現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)からの z 座標 [m]'
        ),
        this.createParam('rx', '**rx**: 軌道に対する x 軸回りの角 [deg]'),
        this.createParam('ry', '**ry**: 軌道に対する y 軸回りの角 [deg]'),
        this.createParam('rz', '**rz**: 軌道に対する z 軸回りの角 [deg]'),
        this.createParam(
          'tilt',
          '**tilt**: 傾斜オプション (0: 常に水平, 1: 勾配に連動, 2: カントに連動, 3: 勾配とカントに連動)'
        ),
        this.createParam('span', '**span**: 曲線における弦の長さ [m]'),
        this.createParam('interval', '**interval**: 配置間隔 [m]'),
        this.createParam(
          'structureKey1',
          '**structureKey1**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        )
      ]
    )

    // #region Repeater.Begin
    // Repeater.Beginのストラクチャーキー2~5まで
    repeaterBegin.addSyntax(
      this.convMarkDown(
        'ストラクチャーの連続配置を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。ストラクチャーは、軌道に沿って一定間隔に配置されます。'
      ),
      [
        this.createParam(
          'trackKey',
          '**trackKey**: 配置先の軌道名 (0: 自軌道)'
        ),
        this.createParam('x', '**x**: 軌道からの x 座標 [m]'),
        this.createParam('y', '**y**: 軌道からの y 座標 [m]'),
        this.createParam(
          'z',
          '**z**: [現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)からの z 座標 [m]'
        ),
        this.createParam('rx', '**rx**: 軌道に対する x 軸回りの角 [deg]'),
        this.createParam('ry', '**ry**: 軌道に対する y 軸回りの角 [deg]'),
        this.createParam('rz', '**rz**: 軌道に対する z 軸回りの角 [deg]'),
        this.createParam(
          'tilt',
          '**tilt**: 傾斜オプション (0: 常に水平, 1: 勾配に連動, 2: カントに連動, 3: 勾配とカントに連動)'
        ),
        this.createParam('span', '**span**: 曲線における弦の長さ [m]'),
        this.createParam('interval', '**interval**: 配置間隔 [m]'),
        this.createParam(
          'structureKey1',
          '**structureKey1**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey2',
          '**structureKey2**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        )
      ]
    )

    repeaterBegin.addSyntax(
      this.convMarkDown(
        'ストラクチャーの連続配置を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。ストラクチャーは、軌道に沿って一定間隔に配置されます。'
      ),
      [
        this.createParam(
          'trackKey',
          '**trackKey**: 配置先の軌道名 (0: 自軌道)'
        ),
        this.createParam('x', '**x**: 軌道からの x 座標 [m]'),
        this.createParam('y', '**y**: 軌道からの y 座標 [m]'),
        this.createParam(
          'z',
          '**z**: [現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)からの z 座標 [m]'
        ),
        this.createParam('rx', '**rx**: 軌道に対する x 軸回りの角 [deg]'),
        this.createParam('ry', '**ry**: 軌道に対する y 軸回りの角 [deg]'),
        this.createParam('rz', '**rz**: 軌道に対する z 軸回りの角 [deg]'),
        this.createParam(
          'tilt',
          '**tilt**: 傾斜オプション (0: 常に水平, 1: 勾配に連動, 2: カントに連動, 3: 勾配とカントに連動)'
        ),
        this.createParam('span', '**span**: 曲線における弦の長さ [m]'),
        this.createParam('interval', '**interval**: 配置間隔 [m]'),
        this.createParam(
          'structureKey1',
          '**structureKey1**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey2',
          '**structureKey2**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey3',
          '**structureKey3**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        )
      ]
    )

    repeaterBegin.addSyntax(
      this.convMarkDown(
        'ストラクチャーの連続配置を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。ストラクチャーは、軌道に沿って一定間隔に配置されます。'
      ),
      [
        this.createParam(
          'trackKey',
          '**trackKey**: 配置先の軌道名 (0: 自軌道)'
        ),
        this.createParam('x', '**x**: 軌道からの x 座標 [m]'),
        this.createParam('y', '**y**: 軌道からの y 座標 [m]'),
        this.createParam(
          'z',
          '**z**: [現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)からの z 座標 [m]'
        ),
        this.createParam('rx', '**rx**: 軌道に対する x 軸回りの角 [deg]'),
        this.createParam('ry', '**ry**: 軌道に対する y 軸回りの角 [deg]'),
        this.createParam('rz', '**rz**: 軌道に対する z 軸回りの角 [deg]'),
        this.createParam(
          'tilt',
          '**tilt**: 傾斜オプション (0: 常に水平, 1: 勾配に連動, 2: カントに連動, 3: 勾配とカントに連動)'
        ),
        this.createParam('span', '**span**: 曲線における弦の長さ [m]'),
        this.createParam('interval', '**interval**: 配置間隔 [m]'),
        this.createParam(
          'structureKey1',
          '**structureKey1**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey2',
          '**structureKey2**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey3',
          '**structureKey3**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey4',
          '**structureKey4**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        )
      ]
    )

    repeaterBegin.addSyntax(
      this.convMarkDown(
        'ストラクチャーの連続配置を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。ストラクチャーは、軌道に沿って一定間隔に配置されます。'
      ),
      [
        this.createParam(
          'trackKey',
          '**trackKey**: 配置先の軌道名 (0: 自軌道)'
        ),
        this.createParam('x', '**x**: 軌道からの x 座標 [m]'),
        this.createParam('y', '**y**: 軌道からの y 座標 [m]'),
        this.createParam(
          'z',
          '**z**: [現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)からの z 座標 [m]'
        ),
        this.createParam('rx', '**rx**: 軌道に対する x 軸回りの角 [deg]'),
        this.createParam('ry', '**ry**: 軌道に対する y 軸回りの角 [deg]'),
        this.createParam('rz', '**rz**: 軌道に対する z 軸回りの角 [deg]'),
        this.createParam(
          'tilt',
          '**tilt**: 傾斜オプション (0: 常に水平, 1: 勾配に連動, 2: カントに連動, 3: 勾配とカントに連動)'
        ),
        this.createParam('span', '**span**: 曲線における弦の長さ [m]'),
        this.createParam('interval', '**interval**: 配置間隔 [m]'),
        this.createParam(
          'structureKey1',
          '**structureKey1**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey2',
          '**structureKey2**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey3',
          '**structureKey3**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey4',
          '**structureKey4**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey5',
          '**structureKey5**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        )
      ]
    )
    // #endregion

    // Repeater[].Begin0(trackKey, tilt, span, interval, ...structureKeyN)
    const repeaterBegin0 = new MapDoc(
      MapSyntaxType.Syntax2,
      'Repeater',
      '',
      'Begin0',
      this.convMarkDown(
        'ストラクチャーの連続配置を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。Repeater[].Begin 構文の x, y, z, rx, ry, rz に 0 を設定したことと同じです。'
      ),
      [
        this.createParam(
          'trackKey',
          '**trackKey**: 配置先の軌道名 (0: 自軌道)'
        ),
        this.createParam(
          'tilt',
          '**tilt**: 傾斜オプション (0: 常に水平, 1: 勾配に連動, 2: カントに連動, 3: 勾配とカントに連動)'
        ),
        this.createParam('span', '**span**: 曲線における弦の長さ [m]'),
        this.createParam('interval', '**interval**: 配置間隔 [m]'),
        this.createParam(
          'structureKey1',
          '**structureKey1**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        )
      ]
    )

    // #region Repeater.Begin
    // Repeater.Beginのストラクチャーキー2~5まで
    repeaterBegin0.addSyntax(
      this.convMarkDown(
        'ストラクチャーの連続配置を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。Repeater[].Begin 構文の x, y, z, rx, ry, rz に 0 を設定したことと同じです。'
      ),
      [
        this.createParam(
          'trackKey',
          '**trackKey**: 配置先の軌道名 (0: 自軌道)'
        ),
        this.createParam(
          'tilt',
          '**tilt**: 傾斜オプション (0: 常に水平, 1: 勾配に連動, 2: カントに連動, 3: 勾配とカントに連動)'
        ),
        this.createParam('span', '**span**: 曲線における弦の長さ [m]'),
        this.createParam('interval', '**interval**: 配置間隔 [m]'),
        this.createParam(
          'structureKey1',
          '**structureKey1**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey2',
          '**structureKey2**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        )
      ]
    )

    repeaterBegin0.addSyntax(
      this.convMarkDown(
        'ストラクチャーの連続配置を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。Repeater[].Begin 構文の x, y, z, rx, ry, rz に 0 を設定したことと同じです。'
      ),
      [
        this.createParam(
          'trackKey',
          '**trackKey**: 配置先の軌道名 (0: 自軌道)'
        ),
        this.createParam(
          'tilt',
          '**tilt**: 傾斜オプション (0: 常に水平, 1: 勾配に連動, 2: カントに連動, 3: 勾配とカントに連動)'
        ),
        this.createParam('span', '**span**: 曲線における弦の長さ [m]'),
        this.createParam('interval', '**interval**: 配置間隔 [m]'),
        this.createParam(
          'structureKey1',
          '**structureKey1**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey2',
          '**structureKey2**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey3',
          '**structureKey3**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        )
      ]
    )

    repeaterBegin0.addSyntax(
      this.convMarkDown(
        'ストラクチャーの連続配置を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。Repeater[].Begin 構文の x, y, z, rx, ry, rz に 0 を設定したことと同じです。'
      ),
      [
        this.createParam(
          'trackKey',
          '**trackKey**: 配置先の軌道名 (0: 自軌道)'
        ),
        this.createParam(
          'tilt',
          '**tilt**: 傾斜オプション (0: 常に水平, 1: 勾配に連動, 2: カントに連動, 3: 勾配とカントに連動)'
        ),
        this.createParam('span', '**span**: 曲線における弦の長さ [m]'),
        this.createParam('interval', '**interval**: 配置間隔 [m]'),
        this.createParam(
          'structureKey1',
          '**structureKey1**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey2',
          '**structureKey2**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey3',
          '**structureKey3**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey4',
          '**structureKey4**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        )
      ]
    )

    repeaterBegin0.addSyntax(
      this.convMarkDown(
        'ストラクチャーの連続配置を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。Repeater[].Begin 構文の x, y, z, rx, ry, rz に 0 を設定したことと同じです。'
      ),
      [
        this.createParam(
          'trackKey',
          '**trackKey**: 配置先の軌道名 (0: 自軌道)'
        ),
        this.createParam(
          'tilt',
          '**tilt**: 傾斜オプション (0: 常に水平, 1: 勾配に連動, 2: カントに連動, 3: 勾配とカントに連動)'
        ),
        this.createParam('span', '**span**: 曲線における弦の長さ [m]'),
        this.createParam('interval', '**interval**: 配置間隔 [m]'),
        this.createParam(
          'structureKey1',
          '**structureKey1**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey2',
          '**structureKey2**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey3',
          '**structureKey3**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey4',
          '**structureKey4**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        ),
        this.createParam(
          'structureKey5',
          '**structureKey5**: ストラクチャー名 ([ストラクチャーリストファイル](http://bvets.net/jp/edit/formats/route/structure.html)で定義した文字列)'
        )
      ]
    )
    // #endregion

    // Repeater[].End()
    const repeaterEnd = new MapDoc(
      MapSyntaxType.Syntax2,
      'Repeater',
      '',
      'End',
      this.convMarkDown(
        'ストラクチャーの連続配置を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)で終了します。'
      ),
      []
    )

    // Background.Change(structureKey)
    const backgroundChange = new MapDoc(
      MapSyntaxType.Syntax1,
      'BackGround',
      '',
      'Change',
      this.convMarkDown('背景を変更します。'),
      [this.createParam('structureKey', '**structureKey**: ストラクチャー名')]
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'Repeater',
        '',
        '',
        this.convMarkDown('連続ストラクチャー'),
        []
      )
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'BackGround',
        '',
        '',
        this.convMarkDown('背景'),
        []
      )
    )

    this.syntaxes.push(
      repeaterBegin,
      repeaterBegin0,
      repeaterEnd,
      backgroundChange
    )
    //#endregion

    //#region 停車場

    // Station.Load(filePath)
    const stationLoad = new MapDoc(
      MapSyntaxType.Syntax1,
      'Station',
      '',
      'Load',
      this.convMarkDown(
        '[停車場リストファイル](http://bvets.net/jp/edit/formats/route/station.html)にもとづいて停車場を定義します。'
      ),
      [
        this.createParam(
          'filePath',
          '**filePath**: このファイルから[停車場リストファイル](http://bvets.net/jp/edit/formats/route/station.html)への相対パス'
        )
      ]
    )

    // Station[].Put(door, margin1, margin2)
    const stationPut = new MapDoc(
      MapSyntaxType.Syntax2,
      'Station',
      '',
      'Put',
      this.convMarkDown(
        'この列車の停止位置を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)に設定します。列車停止位置目標ストラクチャーを設置するには Structure.Put を使用してください。'
      ),
      [
        this.createParam('door', '**door**: 開くドアの方向 (-1: 左, 1: 右)'),
        this.createParam(
          'margin1',
          '**margin1**: 停止位置誤差の後方許容範囲 (負の値で設定)'
        ),
        this.createParam('margin2', '**margin2**: 停止位置誤差の前方許容範囲')
      ]
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'Station',
        '',
        '',
        this.convMarkDown('停車場'),
        []
      )
    )

    this.syntaxes.push(stationLoad, stationPut)

    //#endregion

    //#region 閉そく

    // Section.Begin(signal0, signal1, ...signalN)
    const sectionBegin = new MapDoc(
      MapSyntaxType.Syntax1,
      'Section',
      '',
      'Begin',
      this.convMarkDown(
        '新しい閉そくを[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。'
      ),
      [
        this.createParam(
          'signal0',
          '**signal0**: 先行列車がこの閉そくに存在する場合の信号インデックス'
        ),
        this.createParam(
          'signal1',
          '**signal0**: 先行列車が 1 閉そく先に存在する場合の信号インデックス'
        ),
        this.createParam(
          '...signalN',
          '**signalN**: 先行列車が N 閉そく先に存在する場合の信号インデックス'
        )
      ]
    )

    // Section.SetSpeedLimit(v0, v1, ...vN)
    const sectionSetspeedlimit = new MapDoc(
      MapSyntaxType.Syntax1,
      'Section',
      '',
      'SetSpeedLimit',
      this.convMarkDown('信号現示の許容速度を設定します。'),
      [
        this.createParam(
          'signal0',
          '**signal0**: 走行速度 [km/h] (null: 許容速度なし)'
        ),
        this.createParam(
          'signal1',
          '**signal0**: 走行速度 [km/h] (null: 許容速度なし)'
        ),
        this.createParam(
          '...signalN',
          '**signalN**: 走行速度 [km/h] (null: 許容速度なし)'
        )
      ]
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'Section',
        '',
        '',
        this.convMarkDown('閉そく'),
        []
      )
    )

    this.syntaxes.push(sectionBegin, sectionSetspeedlimit)

    //#endregion 閉そく

    //#region 地上信号機

    // Signal.Load(filePath)
    const signalLoad = new MapDoc(
      MapSyntaxType.Syntax1,
      'Signal',
      '',
      'Load',
      this.convMarkDown(
        '[信号現示リストファイル](http://bvets.net/jp/edit/formats/route/signal.html)にもとづいて信号現示を定義します。'
      ),
      [
        this.createParam(
          'filePath',
          '**filePath**: このファイルから[信号現示リストファイル](http://bvets.net/jp/edit/formats/route/signal.html)への相対パス'
        )
      ]
    )

    // Signal.Put(section, trackKey, x, y)
    const signalPut = new MapDoc(
      MapSyntaxType.Syntax2,
      'Signal',
      '',
      'Put',
      this.convMarkDown(
        '地上信号機を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)に設置します。'
      ),
      [
        this.createParam(
          'section',
          '**section**: 関連づける閉そくの相対インデックス'
        ),
        this.createParam('trackKey', '**trackKey**: 配置先の軌道名'),
        this.createParam('x', '**x**: 軌道からの x 座標 [m]'),
        this.createParam('y', '**y**: 軌道からの y 座標 [m]')
      ]
    )

    // Signal.Put(section, trackKey, x, y, z, rx, ry, rz, tilt, span)
    signalPut.addSyntax(
      this.convMarkDown(
        '地上信号機を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)に設置します。'
      ),
      [
        this.createParam(
          'section',
          '**section**: 関連づける閉そくの相対インデックス'
        ),
        this.createParam('trackKey', '**trackKey**: 配置先の軌道名'),
        this.createParam('x', '**x**: 軌道からの x 座標 [m]'),
        this.createParam('y', '**y**: 軌道からの y 座標 [m]'),
        this.createParam(
          'z',
          '**z**: [現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)からの z 座標 [m]'
        ),
        this.createParam('rx', '**rx**: 軌道に対する x 軸回りの角 [deg]'),
        this.createParam('ry', '**ry**: 軌道に対する y 軸回りの角 [deg]'),
        this.createParam('rz', '**rz**: 軌道に対する z 軸回りの角 [deg]'),
        this.createParam(
          'tilt',
          '**tilt**: 傾斜オプション (0: 常に水平, 1: 勾配に連動, 2: カントに連動, 3: 勾配とカントに連動)'
        ),
        this.createParam('span', '**span**: 曲線における弦の長さ [m]')
      ]
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'Signal',
        '',
        '',
        this.convMarkDown('地上信号機'),
        []
      )
    )

    this.syntaxes.push(signalLoad, signalPut)

    //#endregion

    //#region 地上子

    // Beacon.Put(type, section, sendData)
    const beaconPut = new MapDoc(
      MapSyntaxType.Syntax1,
      'Beacon',
      '',
      'Put',
      this.convMarkDown(
        '地上子の送信イベントを[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)に定義します。地上子ストラクチャーを設置するには Structure[].Put 構文を使用してください。'
      ),
      [
        this.createParam('type', '**type**: 保安装置に送る地上子種別 (整数)'),
        this.createParam(
          'section',
          '**section**: 関連づける閉そくの相対インデックス'
        ),
        this.createParam('sendData', '**sendData**: 保安装置に送る値 (整数)')
      ]
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'Beacon',
        '',
        '',
        this.convMarkDown('地上子'),
        []
      )
    )

    this.syntaxes.push(beaconPut)

    //#endregion

    //#region 速度制限

    // SpeedLimit.Begin(v)
    const speedlimitBegin = new MapDoc(
      MapSyntaxType.Syntax1,
      'SpeedLimit',
      '',
      'Begin',
      this.convMarkDown(
        '速度制限を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)から開始します。速度制限標識ストラクチャーを設置するには Structure.Put 構文を使用してください。'
      ),
      [this.createParam('v', '**v**: 走行速度 [km/h]')]
    )

    // SpeedLimit.End()
    const speedlimitEnd = new MapDoc(
      MapSyntaxType.Syntax1,
      'SpeedLimit',
      '',
      'End',
      this.convMarkDown(
        '速度制限を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)で終了します。速度制限解除標識ストラクチャーを設置するには Structure.Put 構文を使用してください。'
      ),
      []
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'SppedLimit',
        '',
        '',
        this.convMarkDown('速度制限'),
        []
      )
    )

    this.syntaxes.push(speedlimitBegin, speedlimitEnd)

    //#endregion

    //#region 先行列車

    // PreTrain.Pass(time)
    const pretrainPass = new MapDoc(
      MapSyntaxType.Syntax1,
      'PreTrain',
      '',
      'Pass',
      this.convMarkDown(
        '先行列車が[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)を通過する時刻を設定します。'
      ),
      [this.createParam('time', "**time**: 時刻を表す文字列 ('hh:mm:ss')")]
    )
    // PreTrain.Pass(second)
    pretrainPass.addSyntax(
      this.convMarkDown(
        '先行列車が[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)を通過する時刻を設定します。'
      ),
      [this.createParam('second', '**second**: 00:00:00 からの経過時間 [sec]')]
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'PreTrain',
        '',
        '',
        this.convMarkDown('先行列車'),
        []
      )
    )

    this.syntaxes.push(pretrainPass)

    //#endregion 先行列車

    //#region 光源

    // Light.Ambient(red, green, blue)
    const lightAmbient = new MapDoc(
      MapSyntaxType.Syntax1,
      'Light',
      '',
      'Ambient',
      this.convMarkDown(
        '環境光の色 (アンビエント色) を設定します。この構文は、マップファイルに 1 回のみ記述可能です。'
      ),
      [
        this.createParam('red', '**red**: 赤成分 (0 ~ 1)'),
        this.createParam('green', '**green**: 緑成分 (0 ~ 1)'),
        this.createParam('blue', '**blue**: 青成分 (0 ~ 1)')
      ]
    )

    // Light.Diffuse(red, green, blue)
    const lightDiffuse = new MapDoc(
      MapSyntaxType.Syntax1,
      'Light',
      '',
      'Diffuse',
      this.convMarkDown(
        '平行光の色 (ディフューズ色) を設定します。この構文は、マップファイルに 1 回のみ記述可能です。'
      ),
      [
        this.createParam('red', '**red**: 赤成分 (0 ~ 1)'),
        this.createParam('green', '**green**: 緑成分 (0 ~ 1)'),
        this.createParam('blue', '**blue**: 青成分 (0 ~ 1)')
      ]
    )

    // Light.Direction(pitch, yaw)
    const lightDirection = new MapDoc(
      MapSyntaxType.Syntax1,
      'Light',
      '',
      'Direction',
      this.convMarkDown(
        '距離程 0 において、平行光が指す方向を設定します。この構文は、マップファイルに 1 回のみ記述可能です。'
      ),
      [
        this.createParam('pitch', '**pitch**: 平行光のピッチ角 [deg]'),
        this.createParam('yaw', '**yaw**: 平行光のヨー角 [deg]')
      ]
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'Light',
        '',
        '',
        this.convMarkDown('光源'),
        []
      )
    )

    this.syntaxes.push(lightAmbient, lightDiffuse, lightDirection)

    //#endregion

    //#region 霧効果

    // Fog.Interpolate(density, red, green, blue)
    const fogInterpolate = new MapDoc(
      MapSyntaxType.Syntax1,
      'Fog',
      '',
      'Interpolate',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における霧効果を設定します。2 つの Fog.Interpolate の間は線形補間されます。'
      ),
      [
        this.createParam('density', '**density**: 濃度'),
        this.createParam('red', '**red**: 赤成分 (0 ~ 1)'),
        this.createParam('green', '**green**: 緑成分 (0 ~ 1)'),
        this.createParam('blue', '**blue**: 青成分 (0 ~ 1)')
      ]
    )
    // Fog.Interpolate(density)
    fogInterpolate.addSyntax(
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における霧効果を設定します。2 つの Fog.Interpolate の間は線形補間されます。'
      ),
      [this.createParam('density', '**density**: 濃度')]
    )
    fogInterpolate.addSyntax(
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における霧効果を設定します。2 つの Fog.Interpolate の間は線形補間されます。'
      ),
      []
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'Fog',
        '',
        '',
        this.convMarkDown('霧効果'),
        []
      )
    )

    this.syntaxes.push(fogInterpolate)

    //#endregion

    //#region 風景描画距離

    // DrawDistance.Change(value)
    const drawdistanceChange = new MapDoc(
      MapSyntaxType.Syntax1,
      'DrawDistance',
      '',
      'Change',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降の風景の描画距離を設定します。[設定] ウィンドウで設定される描画距離と、ここで設定する描画距離の短い方が適用されます。'
      ),
      [
        this.createParam(
          'value',
          '**value**: 距離 [m] (0: [設定] ウィンドウで設定される描画距離を適用)'
        )
      ]
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'DrawDistance',
        '',
        '',
        this.convMarkDown('風景描画距離'),
        []
      )
    )

    this.syntaxes.push(drawdistanceChange)

    //#endregion

    //#region 運転台の明るさ

    // CabIlluminance.Interpolate(value)
    const cabInterpolate = new MapDoc(
      MapSyntaxType.Syntax1,
      'CabIlluminance',
      '',
      'Interpolate',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における運転台の明るさを設定します。2 つの CabIlluminance.Interpolate の間は線形補間されます。'
      ),
      [
        this.createParam(
          'value',
          '**value**: 昼間画像と夜間画像の混合比 (0: 夜間画像 ~ 1: 昼間画像)'
        )
      ]
    )
    // CabIlluminance.Interpolate()
    cabInterpolate.addSyntax(
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)における運転台の明るさを設定します。2 つの CabIlluminance.Interpolate の間は線形補間されます。'
      ),
      []
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'CabIlluminance',
        '',
        '',
        this.convMarkDown('運転台の明るさ'),
        []
      )
    )

    this.syntaxes.push(cabInterpolate)

    //#endregion

    //#region 軌道変位

    // Irregularity.Change(x, y, r, lx, ly, lr)
    const irregularityChange = new MapDoc(
      MapSyntaxType.Syntax1,
      'Irregularity',
      '',
      'Change',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降の軌道変位を設定します。'
      ),
      [
        this.createParam(
          'x',
          '**x**: 左右変位 (左と右のレールの通り変位の平均に相当) の標準偏差 [m]'
        ),
        this.createParam(
          'y',
          '**y**: 上下変位 (左と右のレールの高低変位の平均に相当) の標準偏差 [m]'
        ),
        this.createParam(
          'r',
          '**r**: ロール変位 (水準変位を軌間で除した値に相当) の標準偏差 [rad]'
        ),
        this.createParam('lx', '**lx**: 左右変位の遮断波長 [m]'),
        this.createParam('ly', '**ly**: 上下変位の遮断波長 [m]'),
        this.createParam('lr', '**lr**: ロール変位の遮断波長 [m]')
      ]
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'Irregularity',
        '',
        '',
        this.convMarkDown('軌道変位'),
        []
      )
    )

    this.syntaxes.push(irregularityChange)

    //#endregion

    //#region 粘着特性

    // Adhesion.Change(a)
    const adhesionChange = new MapDoc(
      MapSyntaxType.Syntax1,
      'Adhesion',
      '',
      'Change',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降の車輪-レール間の粘着特性を設定します。'
      ),
      [this.createParam('a', '**a**: 走行速度 0 km/h における粘着係数')]
    )
    // Adhesion.Change(a,b,c)
    adhesionChange.addSyntax(
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降の車輪-レール間の粘着特性を設定します。'
      ),
      [
        this.createParam('a', '**a**: 走行速度 0 km/h における粘着係数'),
        this.createParam(
          'b',
          '**b**: 粘着係数の走行速度に対する変化を表す係数'
        ),
        this.createParam('c', '**c**: 粘着係数の走行速度に対する変化を表す係数')
      ]
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'Adhesion',
        '',
        '',
        this.convMarkDown('粘着特性'),
        []
      )
    )

    this.syntaxes.push(adhesionChange)

    //#endregion

    //#region 音

    // Sound.Load(filePath)
    const soundLoad = new MapDoc(
      MapSyntaxType.Syntax1,
      'Sound',
      '',
      'Load',
      this.convMarkDown(
        '[サウンドリストファイル](http://bvets.net/jp/edit/formats/route/sound.html)にもとづいてサウンドを読み込みます。'
      ),
      [
        this.createParam(
          'filePath',
          '**filePath**: このファイルから[サウンドリストファイル](http://bvets.net/jp/edit/formats/route/sound.html)への相対パス'
        )
      ]
    )

    // Sound[].Play()
    const soundPlay = new MapDoc(
      MapSyntaxType.Syntax2,
      'Sound',
      '',
      'Play',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)を通過するときにサウンドを 1 回再生します。'
      ),
      []
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'Sound',
        '',
        '',
        this.convMarkDown('音'),
        []
      )
    )

    this.syntaxes.push(soundLoad, soundPlay)

    //#endregion

    //#region 固定音源

    // Sound3D.Load(filePath)
    const sound3dLoad = new MapDoc(
      MapSyntaxType.Syntax1,
      'Sound3D',
      '',
      'Load',
      this.convMarkDown(
        '[サウンドリストファイル](http://bvets.net/jp/edit/formats/route/sound.html)にもとづいてサウンドを読み込みます。'
      ),
      [
        this.createParam(
          'filePath',
          '**filePath**: このファイルから[サウンドリストファイル](http://bvets.net/jp/edit/formats/route/sound.html)への相対パス'
        )
      ]
    )

    // Sound3D[].Put(x, y)
    const sound3dPut = new MapDoc(
      MapSyntaxType.Syntax2,
      'Sound3D',
      '',
      'Put',
      this.convMarkDown(
        '地上に固定された音源を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)に設置します。サウンドは連続再生されます。'
      ),
      [
        this.createParam('x', '**x**: 軌道からの x 座標 [m]'),
        this.createParam('y', '**y**: 軌道からの y 座標 [m]')
      ]
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'Sound3D',
        '',
        '',
        this.convMarkDown('固定音源'),
        []
      )
    )

    this.syntaxes.push(sound3dLoad, sound3dPut)

    //#endregion

    //#region 走行音

    // RollingNoise.Change(index)
    const rollingnoiseChange = new MapDoc(
      MapSyntaxType.Syntax1,
      'RollingNoise',
      '',
      'Change',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降の車輪転動音を設定します。'
      ),
      [
        this.createParam(
          'index',
          '**index**: [車両サウンドファイル](http://bvets.net/jp/edit/formats/vehicle/sound.html)の [Run] セクションで定義したインデックス'
        )
      ]
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'RollingNoise',
        '',
        '',
        this.convMarkDown('走行音'),
        []
      )
    )

    this.syntaxes.push(rollingnoiseChange)

    //#endregion

    //#region フランジきしり音

    // FlangeNoise.Change(index)
    const flangenoiseChange = new MapDoc(
      MapSyntaxType.Syntax1,
      'FlangeNoise',
      '',
      'Change',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)以降のフランジきしり音を設定します。'
      ),
      [
        this.createParam(
          'index',
          '**index**: [車両サウンドファイル](http://bvets.net/jp/edit/formats/vehicle/sound.html)の [Flange] セクションで定義したインデックス'
        )
      ]
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'FlangeNoise',
        '',
        '',
        this.convMarkDown('フランジきしり音'),
        []
      )
    )

    this.syntaxes.push(flangenoiseChange)

    //#endregion

    //#region 分岐器通過音

    // JointNoise.Play(index)
    const jointnoisePlay = new MapDoc(
      MapSyntaxType.Syntax1,
      'JointNoise',
      '',
      'Play',
      this.convMarkDown(
        '[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)を通過するときに分岐器通過音を走行速度に応じて再生します。'
      ),
      [
        this.createParam(
          'index',
          '**index**: [車両サウンドファイル](http://bvets.net/jp/edit/formats/vehicle/sound.html)の [Joint] セクションで定義したインデックス'
        )
      ]
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'JointNoise',
        '',
        '',
        this.convMarkDown('分岐器通過音'),
        []
      )
    )

    this.syntaxes.push(jointnoisePlay)

    //#endregion

    //#region 他列車

    // Train.Add(trainKey, filePath, trackKey, direction)
    const trainAdd = new MapDoc(
      MapSyntaxType.Syntax1,
      'Train',
      '',
      'Add',
      this.convMarkDown(
        '[他列車ファイル](http://bvets.net/jp/edit/formats/route/train.html)にもとづいて他列車を定義します。'
      ),
      [
        this.createParam('trainKey', '**trainKey**: 他列車名 (任意の文字列)'),
        this.createParam(
          'filePath',
          '**filePath**: このファイルから[他列車ファイル](http://bvets.net/jp/edit/formats/route/train.html)への相対パス'
        ),
        this.createParam('trackKey', '**trackKey**: 走行する軌道'),
        this.createParam(
          'direction',
          '**direction**: 進行方向 (-1: 対向, 1: 並走)'
        )
      ]
    )

    // Train[trainKey].Load(filePath, trackKey, direction)
    const trainLoad = new MapDoc(
      MapSyntaxType.Syntax2,
      'Train',
      '',
      'Load',
      this.convMarkDown(
        '[他列車ファイル](http://bvets.net/jp/edit/formats/route/train.html)にもとづいて他列車を定義します。'
      ),
      [
        this.createParam(
          'filePath',
          '**filePath**: このファイルから[他列車ファイル](http://bvets.net/jp/edit/formats/route/train.html)への相対パス'
        ),
        this.createParam('trackKey', '**trackKey**: 走行する軌道'),
        this.createParam(
          'direction',
          '**direction**: 進行方向 (-1: 対向, 1: 並走)'
        )
      ]
    )

    // Train[].Enable(time)
    const trainEnable = new MapDoc(
      MapSyntaxType.Syntax2,
      'Train',
      '',
      'Enable',
      this.convMarkDown(
        '自列車が[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)を通過し、かつ設定された時刻になったとき、他列車の動作を有効にします。'
      ),
      [this.createParam('time', "**time**: 時刻を表す文字列 ('hh:mm:ss')")]
    )
    // Train[].Enable(second)
    trainEnable.addSyntax(
      this.convMarkDown(
        '自列車が[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)を通過し、かつ設定された時刻になったとき、他列車の動作を有効にします。'
      ),
      [this.createParam('second', '**second**: 00:00:00 からの経過時間 [sec]')]
    )

    // Train[].Stop(decelerate, stopTime, accelerate, speed)
    const trainStop = new MapDoc(
      MapSyntaxType.Syntax2,
      'Train',
      '',
      'Stop',
      this.convMarkDown(
        '他列車を[現在の距離程](http://bvets.net/jp/edit/formats/route/map.html#distance)に一旦停車させます。'
      ),
      [
        this.createParam('decelerate', '**decelerate**: 減速度 [km/h/s]'),
        this.createParam('stopTime', '**stopTime**: 停車時間 [s]'),
        this.createParam('accelerate', '**accelerate**: 加速度 [km/h/s]'),
        this.createParam('speed', '**speed**: 加速後の走行速度 [km/h]')
      ]
    )

    this.mapElements.push(
      new MapDoc(
        MapSyntaxType.Syntax1,
        'Train',
        '',
        '',
        this.convMarkDown('他列車'),
        []
      )
    )

    this.syntaxes.push(trainAdd, trainLoad, trainEnable, trainStop)

    //#endregion
  }

  /**
   * 全ての構文を取得します。
   */
  public getSyntaxes() {
    return this.syntaxes
  }

  /**
   * 全てのマップ要素名を取得します。
   */
  public getMapElements() {
    return this.mapElements
  }

  /**
   * 引数に与えられたステータスからパラメータを生成します。
   * @param name パラメータ名
   * @param documentString パラメータの説明
   */
  private createParam(name: string, documentString: string): MapParameter {
    return new MapParameter(name, this.convMarkDown(documentString), name.match('structureKey') !== null, name.match('trackKey') !== null)
  }

  /**
   * 引数に与えられた文字列をMarkDownStringに変換します。
   * @param str 変換する文字列
   */
  private convMarkDown(str: string) {
    return new vscode.MarkdownString(str)
  }

  /**
   * インスタンスを取得します。
   */
  public static get Instance(): MapDocs {
    if (!this.instance) {
      this.instance = new MapDocs()
    }

    return this.instance
  }
}
