import * as assert from 'assert'

import { MAP_HEADER } from '../const/headers';
import * as util from '../util'

// Defines a Mocha test suite to group tests of similar kind together
suite('Util Tests', () => {

  // TrimMapText
  test('TrimMapText', () => {
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
    assert.equal('', util.trimMapText(``))
  })

  // trimWhiteSpace
  test('TrimWhiteSpace', () => {
    assert.equal(
      'Curve.X.Interpolate(4,3.4);',
      util.trimWhiteSpace(
        `BveTs Map 2.02:utf-8
        
        // これはコメントです。

          Curve .X.
          Interpolate
          (4, 
            3.4);`,
        MAP_HEADER,
        util.COMMENT_REGEX,
        true,
      )
    )
  })
})
