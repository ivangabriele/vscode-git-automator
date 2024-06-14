import * as path from "path"
import * as vscode from "vscode"

import addAndCommitFiles from "./libs/addAndCommitFiles"
import loadLocalConfig from "./libs/loadLocalConfig"
import pushLocalCommits from "./libs/pushLocalCommits"

import type { Settings } from "./types"

const workspaceRootAbsolutePath = vscode.workspace.workspaceFolders[0].uri.fsPath

export function activate(context: vscode.ExtensionContext) {
  const settings: Settings = loadLocalConfig(workspaceRootAbsolutePath)

  const addAndCommitAllFilesDisposable = vscode.commands.registerCommand(
    "extension.vscode-git-automator.addAndCommitAllFiles",
    () => addAndCommitFiles(["*"], settings),
  )

  const addAndCommitCurrentFileDisposable = vscode.commands.registerCommand(
    "extension.vscode-git-automator.addAndCommitCurrentFile",
    () =>
      addAndCommitFiles(
        [path.relative(workspaceRootAbsolutePath, vscode.window.activeTextEditor.document.fileName)],
        settings,
      ),
  )

  const pushLocalCommitsDisposable = vscode.commands.registerCommand(
    "extension.vscode-git-automator.pushLocalCommits",
    () => pushLocalCommits(settings),
  )

  context.subscriptions.push(
    addAndCommitAllFilesDisposable,
    addAndCommitCurrentFileDisposable,
    pushLocalCommitsDisposable,
  )
}

export function deactivate() {}
