import exec from './exec'

export default async function(filesRelativePaths: string[]): Promise<any> {
  const command = 'git'
  const args = ['add'].concat(filesRelativePaths)

  return exec(command, args)
}
