import to from 'await-to-js'
import * as vscode from 'vscode'

import gitPush from '../helpers/gitPush'
import showProgressNotification from '../libs/showProgressNotification'
import showOptionalMessage from '../helpers/showOptionalMessage'

import { Settings } from '../types';

export default async function pushLocalCommits(settings: Settings): Promise<void> {
  // ----------------------------------
  // GIT PUSH

  const [err] = await to(showProgressNotification<void>('Pushing your local commits...', gitPush))
  // Git warnings are also caught here, so let's ignore them
  // TODO Fix the "To " with rejected commmits case
  // TODO Handle the "Everything up-to-date" message
  if (typeof err !== 'string' || !/^(warning|to\s)/i.test(err)) {
    vscode.window.showErrorMessage(err)
    console.error(err)

    return
  }

  // ----------------------------------
  // END

  showOptionalMessage(`Local commit(s) pushed.`, settings)
}
