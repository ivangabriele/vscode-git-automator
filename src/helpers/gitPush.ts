import { exec } from './exec'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function gitPush(): Promise<any> {
  const command = 'git'
  const args = ['push', 'origin', 'HEAD']

  const output = await exec(command, args)

  return output
}
