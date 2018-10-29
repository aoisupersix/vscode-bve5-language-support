'use strict'

import * as vscode from 'vscode'
import { StructureKeys } from '../bve-structures/StructureKeys'
import * as headers from '../const/headers'
import * as util from '../util'

export class ListFileLoader {
  public loadFiles() {
    // 初期化
    StructureKeys.Instance.clearKey()

    const rootPath = vscode.workspace.rootPath
    if (rootPath === undefined) {
      this.loadFilesFromSyntax()
    } else {
      this.loadFilesFromWorkspace()
    }
  }

  /**
   * リストファイルを構文から取得します。
   */
  public loadFilesFromSyntax() {
    return null
  }

  /**
   * リストファイルをワークスペースのテキストから取得します。
   */
  public loadFilesFromWorkspace() {
    vscode.workspace.findFiles('**/*.{txt,csv}').then(files => {
      for (const file of files) {
        const txt = util.loadFile(file.fsPath)
        const header = txt.split(/[\n\r]/)[0]

        if (header.match(headers.STRUCTURES_HEADER)) {
          // ストラクチャーリスト追加
          StructureKeys.Instance.addKeys(txt)
        }
      }
    })
  }
}
