export default function(filesPaths: string[]): string {
  let commonPath

  filesPaths.forEach((filePath, index) => {
    if (index === 0) return commonPath = filePath
    if (commonPath.length === 0) return

    let length = commonPath.length + 1
    while (--length > 0) {
      if (filePath.substr(0, length) === commonPath.substr(0, length)) break
    }

    if (length === 0) return
    commonPath = commonPath.substr(0, length)
  })

  // Remove the trailing slash
  if (commonPath.length !== 0 && commonPath[commonPath.length - 1] === '/') {
    commonPath = commonPath.substr(0, commonPath.length - 2)
  }

  return commonPath
}
