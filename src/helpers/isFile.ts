// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { lstatSync } from 'fs'

export function isFile(fileAbsolutePath: string): boolean {
  try {
    if (lstatSync(fileAbsolutePath).isFile()) {
      return true
    }

    return false
  } catch (_err) {
    return false
  }
}
