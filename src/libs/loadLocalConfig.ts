// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { readFileSync } from 'fs'
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { resolve } from 'path'
import { window as vscodeWindow, workspace } from 'vscode'

import { deepMergeRight } from '../helpers/deepMergeRight'
import { isFile } from '../helpers/isFile'
import { normalizePattern } from '../helpers/normalizePattern'

import type { Settings } from '../types'

export function loadLocalConfig(workspaceRootAbsolutePath: string): Settings {
  const workspaceSettingsAbsolutePath = resolve(workspaceRootAbsolutePath, '.vscode', 'vscode-git-add-and-commit.json')

  const defaultSettings: Settings = {
    prefillCommitMessage: workspace.getConfiguration('gaac'),
  }

  let userSettings: Settings = {}

  if (isFile(workspaceSettingsAbsolutePath)) {
    try {
      const settingsSource = readFileSync(workspaceSettingsAbsolutePath, 'utf8')
      userSettings = JSON.parse(settingsSource)
    } catch (err) {
      vscodeWindow.showWarningMessage(`
        Can't load ".vscode/vscode-git-add-and-commit.json".
        Please check the file content format.
      `)
      console.error(err)
    }
  }

  // const schemaRes = schemaValidate(settings, SettingsSchema)
  // if (!schemaRes.valid) {
  //   vscode.window.showWarningMessage(`
  //     Settings validation error. Please check the properties in ".vscode/vscode-git-add-and-commit.json"
  //     or remove this file and use your user/workspace settings instead.
  //   `)
  //   schemaRes.errors.forEach(err => console.error(err.message))

  //   return defaultSettings
  // }

  const normalizedSettings = deepMergeRight(defaultSettings, userSettings)

  normalizedSettings.prefillCommitMessage.replacePatternWith =
    normalizedSettings.prefillCommitMessage.replacePatternWith.map((settingsPattern) => ({
      pattern: normalizePattern(settingsPattern.pattern as string),
      with: settingsPattern.with,
    }))

  normalizedSettings.prefillCommitMessage.withGuessedCustomActions =
    normalizedSettings.prefillCommitMessage.withGuessedCustomActions.map((settingsPattern) => ({
      action: settingsPattern.action,
      pattern: normalizePattern(settingsPattern.pattern as string),
      state: settingsPattern.state,
    }))

  return normalizedSettings
}
