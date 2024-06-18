// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { relative } from 'path'
import { type ExtensionContext, commands, window as vscodeWindow, workspace } from 'vscode'

import { addAndCommitFiles } from './libs/addAndCommitFiles'
import { loadLocalConfig } from './libs/loadLocalConfig'
import { pushLocalCommits } from './libs/pushLocalCommits'

import type { Settings } from './types'

export function activate(context: ExtensionContext) {
  const workspaceFolders = workspace.workspaceFolders
  if (!workspaceFolders) {
    return
  }
  const workspaceRootAbsolutePath = workspaceFolders[0].uri.fsPath

  const settings: Settings = loadLocalConfig(workspaceRootAbsolutePath)

  const addAndCommitAllFilesDisposable = commands.registerCommand(
    'extension.vscode-git-automator.addAndCommitAllFiles',
    () => {
      addAndCommitFiles(['*'], settings)
    },
  )

  const addAndCommitCurrentFileDisposable = commands.registerCommand(
    'extension.vscode-git-automator.addAndCommitCurrentFile',
    () => {
      const activeTextEditor = vscodeWindow.activeTextEditor
      if (!activeTextEditor) {
        return
      }

      addAndCommitFiles([relative(workspaceRootAbsolutePath, activeTextEditor.document.fileName)], settings)
    },
  )

  const pushLocalCommitsDisposable = commands.registerCommand('extension.vscode-git-automator.pushLocalCommits', () =>
    pushLocalCommits(settings),
  )

  context.subscriptions.push(
    addAndCommitAllFilesDisposable,
    addAndCommitCurrentFileDisposable,
    pushLocalCommitsDisposable,
  )
}

export function deactivate() {
  return
}
