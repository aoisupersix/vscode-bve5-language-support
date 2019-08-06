import { VehicleDoc } from './VehicleDoc'

/**
 * 車両ファイルの要素を管理するシングルトンクラス
 */
export class VehicleDocs {
    /**
     * インスタンス
     */
    private static instance: VehicleDocs

    private elements: VehicleDoc[] = []

    private constructor() {
        const performanceCurve = new VehicleDoc(
            'PerformanceCurve',
            'このファイルから[車両性能ファイル](http://bvets.net/jp/edit/formats/vehicle/perform.html)への相対パスを記述します。'
        )

        const parameters = new VehicleDoc(
            'Parameter',
            'このファイルから[車両パラメータファイル](http://bvets.net/jp/edit/formats/vehicle/params.html)への相対パスを記述します。'
        )

        const panel = new VehicleDoc(
            'Panel',
            'このファイルから[運転台パネルファイル](http://bvets.net/jp/edit/formats/vehicle/panel.html)への相対パスを記述します。'
        )

        const sound = new VehicleDoc(
            'Sound',
            'このファイルから[車両サウンドファイル](http://bvets.net/jp/edit/formats/vehicle/sound.html)への相対パスを記述します。'
        )

        const ats = new VehicleDoc(
            'Ats',
            'このファイルから[保安装置プラグイン](http://bvets.net/jp/edit/formats/vehicle/ats.html)への相対パスを記述します。'
        )

        const motornoise = new VehicleDoc('MotorNoise', 'このファイルからモータ音ファイルへの相対パスを記述します。')

        this.elements.push(performanceCurve, parameters, panel, sound, ats, motornoise)
    }

    /**
     * インスタンスを取得します。
     */
    public static get Instance(): VehicleDocs {
        if (!this.instance) {
            this.instance = new VehicleDocs()
        }

        return this.instance
    }

    /**
     * 全ての車両ファイル構文を取得します。
     */
    public getElements() {
        return this.elements
    }
}
