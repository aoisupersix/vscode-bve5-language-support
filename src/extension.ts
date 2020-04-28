import * as vscode from 'vscode'

import { DistanceChecker } from './bve-map/distance-checker/distance-checker'
import { ListFileLoader } from './bve-map/keys/listfile-loader'
import { RepeaterKeys } from './bve-map/keys/repeaterkeys'
import { StructureKeys } from './bve-map/keys/structurekeys'
import { TrackKeys } from './bve-map/keys/trackkeys'
import { MapCompletionItemProvider } from './bve-map/map-completionitem-provider'
import { MapController } from './bve-map/map-controller'
import { MapHoverProvider } from './bve-map/map-hover-provider'
import { MapSignatureHelpProvider } from './bve-map/map-signaturehelp-provider'
import { VehicleHoverProvider } from './bve-vehicle/vehicle-hover-provider'

const BVE_MAP_MODE: vscode.DocumentFilter = {
  language: 'bve-map',
}
const BVE_VEHICLE_MODE: vscode.DocumentFilter = {
  language: 'bve-vehicle',
}

const LANG_ID_MAP = 'bve-map'

const structureKeys: StructureKeys = new StructureKeys()
const trackKeys: TrackKeys = new TrackKeys()
const repeaterKeys: RepeaterKeys = new RepeaterKeys()

export function activate(context: vscode.ExtensionContext): void {
  const editor = vscode.window.activeTextEditor
  if (editor !== undefined && editor.document.languageId === LANG_ID_MAP) {
    const distChecker = new DistanceChecker()
    const listFileLoader = new ListFileLoader(structureKeys)
    const controller = new MapController(
      distChecker,
      listFileLoader,
      trackKeys,
      repeaterKeys
    )

    context.subscriptions.push(controller)
    context.subscriptions.push(distChecker)
  }

  // マップ
  context.subscriptions.push(
    vscode.languages.registerSignatureHelpProvider(
      BVE_MAP_MODE,
      new MapSignatureHelpProvider(),
      '('
    )
  )
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      BVE_MAP_MODE,
      new MapCompletionItemProvider(structureKeys, trackKeys, repeaterKeys),
      '.',
      "'"
    )
  )
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(BVE_MAP_MODE, new MapHoverProvider())
  )
  // 車両
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      BVE_VEHICLE_MODE,
      new VehicleHoverProvider()
    )
  )
}

// export function deactivate() {
// }
