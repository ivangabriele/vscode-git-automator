import exec from "./exec"

export default async function (): Promise<any> {
  const command = "git"
  const args = ["status", "-s"]

  return exec(command, args)
}
