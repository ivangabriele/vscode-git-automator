import { exec } from './exec'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function gitStatus(): Promise<any> {
  const command = 'git'
  const args = ['status', '-s']

  const output = await exec(command, args)

  return output
}
