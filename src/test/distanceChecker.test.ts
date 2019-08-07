import * as assert from 'assert'
import * as vscode from 'vscode'

import { DistanceChecker } from '../bve-map/DistanceChecker/DistanceChecker'

suite('DistanceChecker', () => {
    const distChecker = new DistanceChecker()

    suite('#_getDistance', () => {
        test('距離程が取得できない場合は[---]を返す', () => {
            const txt = `
      BveTs Map 2.02
      Curve.BeginTransition();
      `
            return vscode.workspace.openTextDocument({ language: 'bve-map', content: txt }).then(doc => {
                const position = new vscode.Position(0, 0)
                const selection = new vscode.Selection(position, position)
                assert.equal('---', distChecker.getDistance(doc, [selection]))
            })
        })

        test('カーソル位置の距離程を返す', () => {
            const txt = `
      BveTs Map 2.02

      1948;
      Curve.BeginTransition();
      `
            return vscode.workspace.openTextDocument({ language: 'bve-map', content: txt }).then(doc => {
                const position = new vscode.Position(4, 0)
                const selection = new vscode.Selection(position, position)
                assert.equal('1948', distChecker.getDistance(doc, [selection]))
            })
        })
    })
})
