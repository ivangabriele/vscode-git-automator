import * as assert from 'assert'
import * as fs from 'fs-extra'
import * as path from 'path'

import exec from '../helpers/exec'

suite("Heroku Extension Tests", () => {
  const fixturesPath = path.join(__dirname, 'fixtures')
  const fixturesSourcePath = path.join(__dirname, '..', '..', 'src', 'test', 'fixtures')

  suiteSetup(() => {
    fs.copySync(path.join(fixturesSourcePath, 'sample.md'), path.join(fixturesPath, 'sample.md'))
  })

  test("Test helpers/exec()", async () => {
    let command, args
    switch (process.platform) {
      case 'win32':
      command = 'type'
      break

      default:
      command = 'cat'
      break
    }

    let o, x
    try { o = await exec(command, [path.join(fixturesPath, 'sample.md')]) }
    catch(e) { x = e }

    assert.strictEqual(undefined, x)
    assert.strictEqual(`# Hello World !\n`, o)
  })
})
