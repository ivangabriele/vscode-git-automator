import { window as vscodeWindow } from 'vscode'

import type { Settings } from '../types'

export function showOptionalMessage(message: string, settings: Settings, isWarning = false): void {
  if (settings.prefillCommitMessage?.disableOptionalMessages) {
    vscodeWindow.setStatusBarMessage(`${isWarning ? 'Warning: ' : ''}${message}`, 6000)
  } else if (isWarning) {
    vscodeWindow.showWarningMessage(message)
  } else {
    vscodeWindow.showInformationMessage(message)
  }
}
