import * as util from '#/util'

describe('util', () => {
  describe('#trimMapText', () => {
    it('空', () => {
      expect(util.trimMapText('')).toBe('')
    })

    it('スペース', () => {
      expect(util.trimMapText(' 　')).toBe('')
    })

    it('改行', () => {
      expect(
        util.trimMapText(
          `
      `
        )
      ).toBe('')
    })

    it('マップファイルのヘッダ', () => {
      expect(util.trimMapText('BveTs Map 2.02')).toBe('')
      expect(util.trimMapText('bveTS map 2.02')).toBe('')
      expect(
        util.trimMapText(`BveTs  Map
      2.02`)
      ).toBe('')
    })

    it('コメント', () => {
      expect(util.trimMapText('// This is comment')).toBe('')
      expect(
        util.trimMapText(`
      Curve // This is comment
      // This is comment
      .BeginTransition();`)
      ).toBe('Curve.BeginTransition();')
    })

    it('構文', () => {
      expect(
        util.trimMapText(`
      BveTs Map 2.02
      Curve .BeginTransition() ;`)
      ).toBe('Curve.BeginTransition();')
    })
  })
})
