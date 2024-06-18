import { exec } from './exec'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function gitReset(filesRelativePaths: string[] = []): Promise<any> {
  const allIndex = filesRelativePaths.indexOf('*')
  if (allIndex !== -1) {
    filesRelativePaths.splice(allIndex, 1)
  }

  const command = 'git'
  const args = ['reset'].concat(filesRelativePaths)

  const output = await exec(command, args)

  return output
}
