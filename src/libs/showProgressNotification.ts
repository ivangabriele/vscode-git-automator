import { ProgressLocation, window } from 'vscode'

export default async function showProgressNotification<T>(
  message: string,
  cb: () => Promise<T>,
): Promise<T> {
  let res: T

  await window.withProgress(
    { location: ProgressLocation.Notification, title: message },
    async () => {
      res = await cb()
    }
  )

  return res
}
