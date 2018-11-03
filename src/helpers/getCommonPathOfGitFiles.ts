import { GitStatusFile } from '../types'

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
  // TODO Handle common path with a trailing dot
  if (commonPath.length !== 0 && commonPath[commonPath.length - 1] === '/') {
    commonPath = commonPath.substr(0, commonPath.length - 1)
  }

  return commonPath
}
