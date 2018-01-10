export default function(workspaceRootAbsolutePath: string): void {
  try {
    process.chdir(workspaceRootAbsolutePath);
  }
  catch (err) {
    throw err
  }
}
