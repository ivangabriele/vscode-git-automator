import { gitReset } from '../helpers/gitReset'
import { showOptionalMessage } from '../helpers/showOptionalMessage'

import type { Settings } from '../types'

export async function cancelAdd(filesRelativePaths: string[], settings: Settings) {
  showOptionalMessage('Add & Commit canceled.', settings, true)

  const output = await gitReset(filesRelativePaths)

  return output
}
