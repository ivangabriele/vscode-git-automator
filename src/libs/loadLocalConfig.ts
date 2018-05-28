import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

import isFile from '../helpers/isFile'
import merge from '../helpers/merge'
import normalizePattern from '../helpers/normalizePattern'

import { GuessCustomAction, Settings, SettingsPattern } from '../types'
import SettingsSchema from '../schemas/settings'

export default function(workspaceRootAbsolutePath: string): Settings {
  const workspaceSettingsAbsolutePath = path
    .resolve(workspaceRootAbsolutePath, '.vscode', 'vscode-git-add-and-commit.json')

  const defaultSettings: Settings = { prefillCommitMessage: vscode.workspace.getConfiguration('gaac') }

  let userSettings: Settings = {}

  if (isFile(workspaceSettingsAbsolutePath)) {
    try {
      const settingsSource = fs.readFileSync(workspaceSettingsAbsolutePath, 'utf8')
      userSettings = JSON.parse(settingsSource)
    }
    catch (err) {
      vscode.window.showWarningMessage(`
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

  const normalizedSettings = merge(defaultSettings, userSettings)

  normalizedSettings.prefillCommitMessage.replacePatternWith =
    normalizedSettings.prefillCommitMessage.replacePatternWith
      .map(settingsPattern => ({
        pattern: normalizePattern(settingsPattern.pattern as string),
        with: settingsPattern.with
      }))

  normalizedSettings.prefillCommitMessage.withGuessedCustomActions =
    normalizedSettings.prefillCommitMessage.withGuessedCustomActions
      .map(settingsPattern => ({
        action: settingsPattern.action,
        pattern: normalizePattern(settingsPattern.pattern as string),
        state: settingsPattern.state
      }))

  return normalizedSettings
}
