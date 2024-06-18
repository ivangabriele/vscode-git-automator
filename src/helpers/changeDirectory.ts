export function changeDirectory(workspaceRootAbsolutePath: string): void {
  process.chdir(workspaceRootAbsolutePath)
}
