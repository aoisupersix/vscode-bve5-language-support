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

        let parameters = new VehicleDoc(
            "Parameter",
            "このファイルから[車両パラメータファイル](http://bvets.net/jp/edit/formats/vehicle/params.html)への相対パスを記述します。"
        );

        let panel = new VehicleDoc(
            "Panel",
            "このファイルから[運転台パネルファイル](http://bvets.net/jp/edit/formats/vehicle/panel.html)への相対パスを記述します。"
        );

        let sound = new VehicleDoc(
            "Sound",
            "このファイルから[車両サウンドファイル](http://bvets.net/jp/edit/formats/vehicle/sound.html)への相対パスを記述します。"
        );

        let ats = new VehicleDoc(
            "Ats",
            "このファイルから[保安装置プラグイン](http://bvets.net/jp/edit/formats/vehicle/ats.html)への相対パスを記述します。"
        );

        let motornoise = new VehicleDoc(
            "MotorNoise",
            "このファイルからモータ音ファイルへの相対パスを記述します。"
        );

        this._elements.push(
            performance_curve,
            parameters,
            panel,
            sound,
            ats,
            motornoise
        );
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