import { Settings, SettingsPattern } from '../types';

export default function replaceStringWith(str: string, patterns: SettingsPattern[]): string {
  return patterns.reduce((reducedStr: string, { pattern, with: val }: SettingsPattern): string => {
    if (
      pattern.length > 1
      && pattern.substr(0, 1) === '/'
      && pattern.substr(pattern.length - 1, 1) === '/'
    ) {
      const reg = new RegExp(pattern.substr(1, pattern.length - 2))

      return reducedStr.replace(reg, val)
    }

    return reducedStr.replace(pattern, val)
  }, str)
}
