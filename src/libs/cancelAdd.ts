import * as vscode from 'vscode'

import gitReset from '../helpers/gitReset'

export default async function(filesRelativePaths: string[]) {
  vscode.window.showWarningMessage(`Add & Commit canceled.`)

  return gitReset(filesRelativePaths)
}
