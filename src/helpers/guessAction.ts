import type { GuessCustomAction } from '../types'

export function guessAction(commitMessage: string, state, customActions: GuessCustomAction[]): string {
  const customAction = customActions.find(({ pattern: actionPattern, state: actionState }: GuessCustomAction) => {
    if (actionState !== state) {
      return false
    }

    return typeof actionPattern === 'string' ? commitMessage.includes(actionPattern) : actionPattern.test(commitMessage)
  }, customActions)

  if (customAction === undefined) {
    switch (state) {
      case 'ADDED':
        // biome-ignore lint/style/noParameterAssign: <explanation>
        commitMessage += 'create'
        break

      case 'DELETED':
        // biome-ignore lint/style/noParameterAssign: <explanation>
        commitMessage += 'remove'
        break

      case 'RENAMED':
        // biome-ignore lint/style/noParameterAssign: <explanation>
        commitMessage += 'move'
        break

      default:
        break
    }

    return commitMessage
  }

  // biome-ignore lint/style/noParameterAssign: <explanation>
  commitMessage += customAction.action

  return commitMessage
}
