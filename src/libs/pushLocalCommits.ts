import to from 'await-to-js'
import { window as vscodeWindow } from 'vscode'

import { gitPush } from '../helpers/gitPush'
import { showOptionalMessage } from '../helpers/showOptionalMessage'
import { showProgressNotification } from '../libs/showProgressNotification'

import type { Settings } from '../types'

export async function pushLocalCommits(settings: Settings): Promise<void> {
  // ----------------------------------
  // GIT PUSH

  const [err] = await to(showProgressNotification<string>('Pushing your local commits...', gitPush))

  // Git warnings are also caught here, so let's ignore them
  if (err !== null && (typeof err !== 'string' || !(/^to\s/i.test(err) && !/!\s\[rejected\]/i.test(err)))) {
    const errMessage = typeof err !== 'string' ? err.message : err
    if (errMessage === 'Everything up-to-date') {
      vscodeWindow.showInformationMessage(errMessage)
    } else {
      vscodeWindow.showErrorMessage(errMessage)
      console.error(err)

      return
    }
  }

  // ----------------------------------
  // END

  showOptionalMessage('Local commit(s) pushed.', settings)
}
