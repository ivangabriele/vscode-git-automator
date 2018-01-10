export interface GitStatusFile {
  oldPath?: string
  path: string
  state: 'ADDED' | 'DELETED' | 'MODIFIED' | 'RENAMED'
}

export interface SettingsPattern {
  pattern: string
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
      Ignore the file extension in the commit message.

      @example
      "res/icon.png: " => "res/icon: "

      @note
      - Only useful when the `prefillWithFileWorkspacePath` setting is TRUE.
    */
    ignoreFileExtension?: boolean

    /*
      @description
      Replace the commit message via a pattern.

      @see
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace

      @example
      - [{ "pattern": "package.json", "with": "npm" }]
        will replace the commit message like this "package.json: " => "npm: ".
      - [{ "pattern": "/^package[^\\.]*\\.jso?n?/", "with": "npm" }]
        will replace the commit message like this "package-lock.json: " => "npm: ".

      @note
      - If you use a regex, you need the `with` string MUST start AND end with "/".
        You can't add modifiers.
      - Only useful when the `prefillWithFileWorkspacePath` setting is TRUE.
      - If `ignoreFileExtension` setting is TRUE, you still need to specify the extension here.
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
      - If the file has been added (for Git), it will add "create" to the commit message.
      - If the file has been renamed (for Git), it will add "rename" or "move" to the commit message.
      - If the file has been deleted (for Git), it will add "remove" to the commit message.

      @note
      - Only useful when the `prefillWithFileWorkspacePath` setting is TRUE.
      - This option only works when one file has been or one directory has been created or deleted.
    */
    withGuessedAction?: boolean
  }
}
