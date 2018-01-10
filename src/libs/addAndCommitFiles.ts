import * as vscode from 'vscode'

import cancelAdd from './cancelAdd'
import changeDirectory from '../helpers/changeDirectory'
import gitAdd from '../helpers/gitAdd'
import gitCommit from '../helpers/gitCommit'

function validateCommitMessage(message: string | null | undefined): boolean {
  return message !== undefined && message !== null && message.trim() !== ''
}

export default async function addAndCommitFiles(filesRelativePaths: string[]): Promise<void> {
  const workspaceRootAbsolutePath = vscode.workspace.workspaceFolders[0].uri.fsPath

  try {
    await changeDirectory(workspaceRootAbsolutePath)
  }
  catch (err) {
    vscode.window.showErrorMessage(err)
    console.error(err)

    return
  }

  try {
    await gitAdd(filesRelativePaths)
  }
  catch (err) {
    vscode.window.showErrorMessage(err)
    console.error(err)

    return
  }

  let commitMessage = ''
  try {
    commitMessage = await vscode.window.showInputBox({
      ignoreFocusOut: true,
      prompt: 'Git commit message ?',
      validateInput: commitMessage => !validateCommitMessage(commitMessage)
        ? `You can't commit without am empty commit message. Write something or press ESC to cancel.`
        : undefined
    })
  }
  catch (err) {
    vscode.window.showErrorMessage(err)
    console.error(err)

    return cancelAdd(filesRelativePaths)
  }

  if (!validateCommitMessage(commitMessage)) {
    vscode.window.showWarningMessage(`You can't commit without am empty commit message.`)

    return cancelAdd(filesRelativePaths)
  }

  commitMessage = commitMessage.replace(/"/g, '\"')
  try {
    await gitCommit(commitMessage)
  }
  catch (err) {
    vscode.window.showErrorMessage(err)
    console.error(err)

    return cancelAdd(filesRelativePaths)
  }

  vscode.window.showInformationMessage(`File(s) committed to Git with the message: "${commitMessage}".`)
}
