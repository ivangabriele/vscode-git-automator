// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { strictEqual } from 'assert'
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { join } from 'path'
import { copySync } from 'fs-extra'

import { exec } from '../helpers/exec'

// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
suite('Git Automator Extension Tests', () => {
  const fixturesPath = join(__dirname, 'fixtures')
  const fixturesSourcePath = join(__dirname, '..', '..', 'src', 'test', 'fixtures')

  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  suiteSetup(() => {
    copySync(join(fixturesSourcePath, 'sample.md'), join(fixturesPath, 'sample.md'))
  })

  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  test('Test helpers/exec()', async () => {
    let command: string
    switch (process.platform) {
      case 'win32':
        command = 'type'
        break

      default:
        command = 'cat'
        break
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let output: any
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let error: any
    try {
      output = await exec(command, [join(fixturesPath, 'sample.md')])
    } catch (e) {
      error = e
    }

    strictEqual(undefined, error)
    strictEqual('# Hello World !\n', output)
  })
})
