import * as childProcess from 'child_process'

export default async function(command: string, args: string[]): Promise<any> {
  console.log(`${command} ${args.join(' ')}`)

  return new Promise((resolve, reject) => {
    let res, stderr = '', stdout = ''

    try {
      const batch = childProcess.spawn(command, args)

      batch.stdout.on('data', function(data) {
        stdout += data.toString()
      })

      batch.stderr.on('data', data => stdout += data.toString())
      batch.stderr.on('data', data => stderr += data.toString())

      batch.on('close', function() {
        if (stderr !== '') return reject(stderr.trim())

        resolve(stdout)
      })
    }
    catch (err) {
      reject(err)
    }
  })
}
