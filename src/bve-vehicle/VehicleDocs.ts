'use strict';
import { VehicleDoc } from './VehicleDoc';

/**
 * 車両ファイルの要素を管理するシングルトンクラス
 */
export class VehicleDocs {
    /**
     * インスタンス
     */
    private static _instance: VehicleDocs;

    private _elements: VehicleDoc[] = [];

    private constructor() {
        let performance_curve = new VehicleDoc(
            "PerformanceCurve",
            "このファイルから[車両性能ファイル](http://bvets.net/jp/edit/formats/vehicle/perform.html)への相対パスを記述します。"
        );

        this._elements.push(performance_curve);
    }

    /**
     * インスタンスを取得します。
     */
    public static get instance(): VehicleDocs {
        if (!this._instance) {
            this._instance = new VehicleDocs();
        }

        return this._instance;
    }

    /**
     * 全ての車両ファイル構文を取得します。
     */
    public getElements() {
        return this._elements;
    }
}