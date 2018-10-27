import exec from './exec'

export default async function(): Promise<any> {
  const command = 'git'
  const args = ['push', 'origin', 'HEAD']

  return exec(command, args)
}
