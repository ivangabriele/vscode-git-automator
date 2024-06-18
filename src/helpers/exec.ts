// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { spawn } from 'child_process'
import { workspace } from 'vscode'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function exec(command: string, args: string[]): Promise<any> {
  if (!workspace.workspaceFolders) {
    return
  }

  const cwd = workspace.workspaceFolders[0].uri.fsPath

  return new Promise((resolve, reject) => {
    let stderr = ''
    let stdout = ''

    try {
      const batch = spawn(command, args, { cwd })

      batch.stdout.on('data', (data) => {
        stdout += data.toString()
      })

      batch.stderr.on('data', (data) => {
        stdout += data.toString()
      })
      batch.stderr.on('data', (data) => {
        stderr += data.toString()
      })

      batch.on('close', () => {
        if (stderr !== '') {
          reject(stderr.trim())

          return
        }

        resolve(stdout)
      })
    } catch (err) {
      reject(err)
    }
  })
}
