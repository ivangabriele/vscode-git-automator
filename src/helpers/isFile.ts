import * as fs from "fs"

export default function (fileAbsolutePath: string): boolean {
  try {
    if (fs.lstatSync(fileAbsolutePath).isFile()) {
      return true
    }

    return false
  } catch (err) {
    return false
  }
}
