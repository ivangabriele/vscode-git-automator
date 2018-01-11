import * as fs from 'fs'
import { mergeDeepLeft } from 'ramda'
import * as path from 'path'
import { validate as schemaValidate } from 'jsonschema'
import * as vscode from 'vscode'

import isFile from '../helpers/isFile'
import normalizePattern from '../helpers/normalizePattern'

import { GuessCustomAction, Settings, SettingsPattern } from '../types'
import SettingsSchema from '../schemas/settings'

const SETTINGS_DEFAULT: Settings = {
  prefillCommitMessage: {
    disableOptionalMessages: false,
    forceLowerCase: false,
    ignoreFileExtension: false,
    replacePatternWith: [],
    withFileWorkspacePath: false,
    withGuessedAction: false,
    withGuessedCustomActions: [],
  }
}

export default function(workspaceRootAbsolutePath: string): Settings {
  const workspaceSettingsAbsolutePath = path.resolve(workspaceRootAbsolutePath, '.vscode', 'vscode-git-add-and-commit.json')

  if (!isFile(workspaceSettingsAbsolutePath)) return SETTINGS_DEFAULT

  let settings: Settings
  try {
    const settingsSource = fs.readFileSync(workspaceSettingsAbsolutePath, 'utf8')
    settings = JSON.parse(settingsSource)
  }
  catch (err) {
    vscode.window.showWarningMessage(`Can't load ".vscode/vscode-git-add-and-commit.json". Please check the file content format.`)
    console.error(err)

    return SETTINGS_DEFAULT
  }

  const schemaRes = schemaValidate(settings, SettingsSchema)
  if (!schemaRes.valid) {
    vscode.window.showWarningMessage(`Can't validate ".vscode/vscode-git-add-and-commit.json". Please check the properties.`)
    schemaRes.errors.forEach(err => console.error(err.message))

    return SETTINGS_DEFAULT
  }

  const normalizedSettings = mergeDeepLeft(settings, SETTINGS_DEFAULT)

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
