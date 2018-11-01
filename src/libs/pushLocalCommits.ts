import * as vscode from 'vscode'

import gitPush from '../helpers/gitPush'
import showOptionalMessage from '../helpers/showOptionalMessage'

import { Settings } from '../types';

export default async function pushLocalCommits(settings: Settings): Promise<void> {
  // ----------------------------------
  // GIT PUSH

  try {
    await gitPush()
  }
  catch (err) {
    // Git warnings are also caught here, so let's ignore them
    if (typeof err !== 'string' || err.substr(0, 3) !== 'To ') {
      vscode.window.showErrorMessage(err)
      console.error(err)

      return
    }
  }

  // ----------------------------------
  // END

  showOptionalMessage(`Local commit(s) pushed.`, settings)
}
