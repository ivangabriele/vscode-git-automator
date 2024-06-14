import type { SettingsPattern } from "../types"

export default function replaceStringWith(str: string, patterns: SettingsPattern[]): string {
  return patterns.reduce((reducedStr: string, { pattern, with: val }: SettingsPattern): string => {
    return reducedStr.replace(pattern, val)
  }, str)
}
