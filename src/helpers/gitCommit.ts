import exec from './exec'

export default async function(message: string): Promise<any> {
  const command = 'git'
  const args = ['commit', '-m', `${message}`]

  return exec(command, args)
}
