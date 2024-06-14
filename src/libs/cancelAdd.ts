import gitReset from "../helpers/gitReset"
import showOptionalMessage from "../helpers/showOptionalMessage"

import type { Settings } from "../types"

export default async function (filesRelativePaths: string[], settings: Settings) {
  showOptionalMessage(`Add & Commit canceled.`, settings, true)

  return gitReset(filesRelativePaths)
}
