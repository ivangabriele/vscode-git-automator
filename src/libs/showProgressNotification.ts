import { ProgressLocation, window as vscodeWindow } from 'vscode'

export async function showProgressNotification<T>(message: string, cb: () => Promise<T>): Promise<T> {
  return await vscodeWindow.withProgress({ location: ProgressLocation.Notification, title: message }, cb)
}
