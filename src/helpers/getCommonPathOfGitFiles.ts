import { GitStatusFile } from '../types'

// TODO Fix missing last letter for some reason
export default function(gitStatusFiles: GitStatusFile[]): string {
  let commonPath = ''

  gitStatusFiles.forEach((gitStatusFile, index) => {
    if (index === 0) {
      commonPath = gitStatusFile.path

      return
    }
    if (commonPath.length === 0) return

    let length = commonPath.length + 1
    while (--length > 0) {
      if (gitStatusFile.path.substr(0, length) === commonPath.substr(0, length)) break
    }

    if (length === 0) {
      commonPath = ''

      return
    }
    commonPath = commonPath.substr(0, length)
  })

  // Remove the trailing slash
  if (commonPath.length !== 0 && commonPath[commonPath.length - 1] === '/') {
    commonPath = commonPath.substr(0, commonPath.length - 2)
  }

  return commonPath
}
