import exec from './exec'

export default async function(message: string): Promise<any> {
  message = message.replace(/"/g, '\"')

  const command = 'git'
  const args = ['commit', '-m', `"${message}"`]

  return exec(command, args)
}
