import * as assert from 'assert'
import * as path from 'path'
import * as vscode from 'vscode'

import { MAP_HEADER, STRUCTURES_HEADER } from '../const/headers'
import { COMMENT } from '../const/syntaxes'
import * as util from '../util'

// Defines a Mocha test suite to group tests of similar kind together
suite('Util', () => {
  suite('#trimMapText', () => {
    test('空文字のトリム', () => {
      assert.equal('', util.trimMapText(''))
      assert.equal(
        '',
        util.trimMapText(
          `


        `
        )
      )
    })

    test('構文のトリム', () => {
      assert.equal(
        'Curve.BeginTransition();',
        util.trimMapText(
          `BveTs Map 2.02

                  Curve.
                  BeginTransition
                  ()
                  ;`
        )
      )
    })
  })

  suite('#trimWhiteSpace', () => {
    test('空文字のトリム', () => {
      assert.equal('', util.trimWhiteSpace(''))
      assert.equal(
        '',
        util.trimWhiteSpace(
          `

        `
        )
      )
    })

    test('ヘッダのトリム', () => {
      assert.equal('', util.trimWhiteSpace('BveTs Map 2.02', MAP_HEADER))
      assert.equal('', util.trimWhiteSpace('BVETs maP 1.00:utf-8', MAP_HEADER))
      assert.equal(
        '',
        util.trimWhiteSpace('BveTs Structure List 2.00', STRUCTURES_HEADER)
      )
      assert.equal(
        '',
        util.trimWhiteSpace(
          'BVeTS Structure LIST 9.99:shift_jis',
          STRUCTURES_HEADER
        )
      )
    })

    test('コメントのトリム', () => {
      assert.equal(
        '',
        util.trimWhiteSpace('// Curve.Begin()', undefined, COMMENT)
      )
      assert.equal(
        '',
        util.trimWhiteSpace('# Curve.Begin()', undefined, COMMENT)
      )
    })

    test('改行のトリム', () => {
      assert.equal(
        '',
        util.trimWhiteSpace(
          `
        BveTs Map 2.02:utf-8

        // Comment
        `,
          MAP_HEADER,
          undefined,
          true
        )
      )
    })

    test('構文のトリム', () => {
      assert.equal(
        'Curve.BeginTransition();',
        util.trimWhiteSpace(
          `
        BveTs Map 2.02

        Curve
        .
        // BeginTransition(); ここは飛ばされるはず
        BeginTransition
        () ;
        `,
          MAP_HEADER,
          undefined,
          true
        )
      )
    })
  })

  suite('#getAbsoluteFilePath', () => {
    test('空パス', () => {
      assert.equal(path.resolve('.'), util.getAbsoluteFilePath('', ''))
      assert.equal(undefined, util.getAbsoluteFilePath('', './test.txt'))

      const rootPath = vscode.workspace.rootPath
      if (rootPath !== undefined) {
        assert.equal(
          path.dirname(rootPath),
          util.getAbsoluteFilePath(rootPath, '')
        )
      }
    })
  })
})
