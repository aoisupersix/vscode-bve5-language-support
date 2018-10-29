'use strict'

import * as vscode from 'vscode'

import { VehicleDocs } from './VehicleDocs'

export class VehicleHoverProvider implements vscode.HoverProvider {
  public provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Thenable<vscode.Hover> {
    return new Promise((resolve, reject) => {
      const wordRange = document.getWordRangeAtPosition(position)
      if (wordRange === undefined) {
        reject()
        return
      }
      const nowWord = document.getText(wordRange)
      const elements = VehicleDocs.Instance.getElements()

      for (const element of elements) {
        if (element.isMatch(nowWord)) {
          resolve(element.getMapHover(wordRange))
          return
        }
      }
      reject()
    })
  }
}
