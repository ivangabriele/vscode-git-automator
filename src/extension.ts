import * as vscode from 'vscode'
import * as path from 'path'

import addAndCommitFiles from './libs/addAndCommitFiles'

const workspaceRootAbsolutePath = vscode.workspace.workspaceFolders[0].uri.fsPath

export function activate(context: vscode.ExtensionContext) {
  const addAndCommitAllFilesDisposable = vscode.commands.registerCommand(
    'extension.addAndCommitAllFiles',
    () => addAndCommitFiles(['*'])
  )

  let addAndCommitCurrentFileDisposable = vscode.commands.registerCommand(
    'extension.addAndCommitCurrentFile',
    () => addAndCommitFiles([
      path.relative(workspaceRootAbsolutePath, vscode.window.activeTextEditor.document.fileName)
    ])
  )

  context.subscriptions.push(addAndCommitAllFilesDisposable, addAndCommitCurrentFileDisposable)
}

export function deactivate() {
  console.log('deactivate()')
}
