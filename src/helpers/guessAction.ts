import { FileGitState, GuessCustomAction } from '../types';

export default function(commitMessage: string, state, customActions: GuessCustomAction[]): string {
  const customAction = customActions.find(
    ({ pattern: actionPattern, state: actionState }: GuessCustomAction) => {
      if (actionState !== state) return false

      return typeof actionPattern === 'string'
        ? commitMessage.includes(actionPattern)
        : actionPattern.test(commitMessage)
    },
    customActions
  )

  if (customAction === undefined) {
    switch (state) {
      case 'ADDED':
        commitMessage += 'create'
        break

      case 'DELETED':
        commitMessage += 'remove'
        break

      case 'RENAMED':
        commitMessage += 'move'
        break

      default:
        break
    }

    return commitMessage
  }

  return commitMessage += customAction.action
}
