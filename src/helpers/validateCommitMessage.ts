export default function validateCommitMessage(message: string | null | undefined): boolean {
  return message !== undefined && message !== null && message.trim() !== ''
}
