import * as vscode from 'vscode'

import cancelAdd from './cancelAdd'
import changeDirectory from '../helpers/changeDirectory'
import getCommonPathOfGitFiles from '../helpers/getCommonPathOfGitFiles'
import getGitStatusFiles from '../helpers/getGitStatusFiles'
import gitAdd from '../helpers/gitAdd'
import gitCommit from '../helpers/gitCommit'
import guessAction from '../helpers/guessAction'
import replaceStringWith from '../helpers/replaceStringWith'
import showOptionalMessage from '../helpers/showOptionalMessage'
import validateCommitMessage from '../helpers/validateCommitMessage'

import { GitStatusFile, Settings } from '../types';

export default async function addAndCommitFiles(filesRelativePaths: string[], settings: Settings): Promise<void> {
  // ----------------------------------
  // GIT ADD

  try {
    await gitAdd(filesRelativePaths)
  }
  catch (err) {
    // Git warnings are also caught here, so let's ignore them
    if (typeof err !== 'string' || !/^warning/i.test(err)) {
      vscode.window.showErrorMessage(err)
      console.error(err)

      return
    }
  }

  // ----------------------------------
  // COMMIT MESSAGE

  let commitMessage = ''
  let commonFilePath: string

  try {
    const gitStatusFiles = await getGitStatusFiles()

    // If Git didn't find anything to add
    if (gitStatusFiles.length === 0) {
      showOptionalMessage(`Nothing to commit, did you save your changes ?.`, settings, true)

      return
    }

    // Prepare the common path that may be used to prefill the commit message
    if (gitStatusFiles.length === 1) {
      commonFilePath = gitStatusFiles[0].path
    } else {
      commonFilePath = getCommonPathOfGitFiles(gitStatusFiles)
    }

    // Prefill the commit message with file path
    if (settings.prefillCommitMessage.withFileWorkspacePath) {
      commitMessage += commonFilePath + ': '

      if (settings.prefillCommitMessage.ignoreFileExtension) {
        const matches = commitMessage.match(/[^\/](\.\w+):/)
        if (matches !== null && matches.length === 2) {
          commitMessage = commitMessage.replace(matches[1], '')
        }
      }
    }

    // Force the commit message into lower case
    if (settings.prefillCommitMessage.forceLowerCase) {
      commitMessage = commitMessage.toLocaleLowerCase()
    }

    // Prefill the commit message with the guessed action
    if (gitStatusFiles.length === 1) {
      commitMessage = guessAction(
        commitMessage,
        gitStatusFiles[0].state,
        settings.prefillCommitMessage.withGuessedCustomActions
      )
    }

    // Prefill the commit message with settings patterns
    commitMessage = replaceStringWith(commitMessage, settings.prefillCommitMessage.replacePatternWith)

    // Prompt user for the commit message
    commitMessage = await vscode.window.showInputBox({
      ignoreFocusOut: true,
      prompt: 'Git commit message ?',
      validateInput: commitMessage => !validateCommitMessage(commitMessage)
        ? `You can't commit with an empty commit message. Write something or press ESC to cancel.`
        : undefined,
      value: commitMessage
    })
  }
  catch (err) {
    vscode.window.showErrorMessage(err)
    console.error(err)

    return cancelAdd(filesRelativePaths, settings)
  }

  // Check if the commit message is valid
  if (!validateCommitMessage(commitMessage)) {
    showOptionalMessage(`You can't commit with an empty commit message.`, settings, true)

    return cancelAdd(filesRelativePaths, settings)
  }

  // ----------------------------------
  // GIT COMMIT

  try {
    await gitCommit(commitMessage)
  }
  catch (err) {
    // Git warnings are also caught here, so let's ignore them
    if (typeof err !== 'string' || !/^warning/i.test(err)) {
      vscode.window.showErrorMessage(err)
      console.error(err)

      return cancelAdd(filesRelativePaths, settings)
    }
  }

  // ----------------------------------
  // END

  showOptionalMessage(`File(s) committed to Git with the message: "${commitMessage}".`, settings)
}
