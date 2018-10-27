import * as vscode from 'vscode'

import changeDirectory from '../helpers/changeDirectory'
import gitPush from '../helpers/gitPush'
import showOptionalMessage from '../helpers/showOptionalMessage'

import { Settings } from '../types';

export default async function pushLocalCommits(settings: Settings): Promise<void> {
  const workspaceRootAbsolutePath = vscode.workspace.workspaceFolders[0].uri.fsPath

  // ----------------------------------
  // CHANGE DIRECTORY

  try {
    await changeDirectory(workspaceRootAbsolutePath)
  }
  catch (err) {
    vscode.window.showErrorMessage(err)
    console.error(err)

    return
  }

  // ----------------------------------
  // GIT ADD

  try {
    await gitPush()
  }
  catch (err) {
    // Git warnings are also caught here, so let's ignore them
    if (typeof err !== 'string' || err.substr(0, 7) !== 'warning') {
      vscode.window.showErrorMessage(err)
      console.error(err)

      return
    }
  }

  // ----------------------------------
  // END

  showOptionalMessage(`Local commit(s) pushed.`, settings)
}
