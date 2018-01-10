import exec from './exec'

export default async function(filesRelativePaths: string[] = []): Promise<any> {
  const allIndex = filesRelativePaths.indexOf('*')
  if (allIndex !== -1) filesRelativePaths.splice(allIndex, 1)

  const command = 'git'
  const args = ['reset'].concat(filesRelativePaths)

  return exec(command, args)
}
