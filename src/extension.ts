import * as vscode from 'vscode'
import * as path from 'path'

import addAndCommitFiles from './libs/addAndCommitFiles'
import loadLocalConfig from './libs/loadLocalConfig'

import { Settings } from './types'

const workspaceRootAbsolutePath = vscode.workspace.workspaceFolders[0].uri.fsPath

export function activate(context: vscode.ExtensionContext) {
  const settings: Settings = loadLocalConfig(workspaceRootAbsolutePath)

  const addAndCommitAllFilesDisposable = vscode.commands.registerCommand(
    'extension.vscode-git-add-and-commit.addAndCommitAllFiles',
    () => addAndCommitFiles(['*'], settings)
  )

  const addAndCommitCurrentFileDisposable = vscode.commands.registerCommand(
    'extension.vscode-git-add-and-commit.addAndCommitCurrentFile',
    () => addAndCommitFiles([
      path.relative(workspaceRootAbsolutePath, vscode.window.activeTextEditor.document.fileName)
    ], settings)
  )

  context.subscriptions.push(addAndCommitAllFilesDisposable, addAndCommitCurrentFileDisposable)
}

export function deactivate() {
  console.log('deactivate()')
}
