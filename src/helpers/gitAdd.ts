import { exec } from './exec'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function gitAdd(filesRelativePaths: string[]): Promise<any> {
  const command = 'git'
  const args = ['add'].concat(filesRelativePaths)

  const output = await exec(command, args)

  return output
}
