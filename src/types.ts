export type FileGitState = 'ADDED' | 'DELETED' | 'MODIFIED' | 'RENAMED'

export interface GitStatusFile {
  oldPath?: string
  path: string
  state: FileGitState
}

export interface SettingsPattern {
  pattern: string
  with: string
}

export interface GuessCustomAction {
  pattern: string
  state: FileGitState
  with: string
}

export interface Settings {
  /*
    Commit message prefill settings

    @note
    - Most of these options will only work when only one file is added and committed.
    - These options will only be applied to the prefill part
      and won't impact any of your own commit message edit.
  */
  prefillCommitMessage?: {
    /*
      @description
      Show "optional" warning and info messages in the status bar instead of the top modals.
    */
    disableOptionalMessages?: boolean

    /*
      @description
      Force all character in the prefilled commit message to be in lower case.

      @example
      "README: " => "readme: "
    */
    forceLowerCase?: boolean

    /*
      @description
      Ignore the file extension in the commit message.

      @example
      "res/icon.png: " => "res/icon: "

      @note
      - Only useful when the `withFileWorkspacePath` setting is TRUE.
    */
    ignoreFileExtension?: boolean

    /*
      @description
      Replace the commit message via a pattern. These replacements are executed after everything else,
      BUT before your own edit (in the prompt field).

      @see
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace

      @example
      - [{ "pattern": "package.json", "with": "npm" }]
        will replace the commit message like this "package.json: " => "npm: ".
      - [{ "pattern": "/^package[^\\.]*\\.jso?n?/", "with": "npm" }]
        will replace the commit message like this "package-lock.json: " => "npm: ".

      @note
      - If you use a regex, you need the `with` string MUST start AND end with "/". You can't add modifiers.
      - Only useful when the `withFileWorkspacePath` setting is TRUE.
    */
    replacePatternWith?: SettingsPattern[]

    /*
      @description
      Prefill the commit message with the workspace relative file path, followed by ": ",

      @example
      "res/icon.png: "
    */
    withFileWorkspacePath?: boolean

    /*
      @description
      Try to guess the action when it's obvious and add it to the prefilled commit message.

      @description
      - If a single file or directory has been added (for Git), it will add "create" to the commit message.
      - If a single file or directory has been renamed (for Git), it will add "move" to the commit message.
      - If a single file or directory has been deleted (for Git), it will add "remove" to the commit message.

      @note
      - This option only works when one file or one directory has been created, moved/renamed, or deleted.
    */
    withGuessedAction?: boolean

    /*
      @description
      Add a custom action for any prefilled commit matching a pattern and Git action.
      The `action` can be any one of: "ADDED", "DELETED", "MODIFIED", "RENAMED"

      @see
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace

      @description
      - [{ "pattern": "README.md", "action": "MODIFIED", "with": "update" }]
        will prefill the commit message of any update on an existing README.md file like this:
        "package.json: update".

      @note
      - This option can override the `withGuessedAction` since it will be executed afterwards.
    */
    withGuessedCustomActions: GuessCustomAction[]
  }
}
