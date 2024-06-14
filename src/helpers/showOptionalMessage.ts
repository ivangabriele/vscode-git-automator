import * as vscode from "vscode"

import type { Settings } from "../types"

export default function (message: string, settings: Settings, isWarning = false): void {
  if (settings.prefillCommitMessage.disableOptionalMessages) {
    vscode.window.setStatusBarMessage(`${isWarning ? "Warning: " : ""}${message}`, 6000)
  } else if (isWarning) {
    vscode.window.showWarningMessage(message)
  } else {
    vscode.window.showInformationMessage(message)
  }
}
