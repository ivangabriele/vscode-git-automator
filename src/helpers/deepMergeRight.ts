import { isMergeableObject } from './isMergeableObject'

function emptyTarget(val) {
  return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value) {
  return isMergeableObject(value) ? deepMergeRight(emptyTarget(value), value) : value
}

function arrayMerge(target, source) {
  return target.concat(source).map((element) => cloneUnlessOtherwiseSpecified(element))
}

function mergeObject(target, source) {
  const destination = {}

  if (isMergeableObject(target)) {
    for (const key in target) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key])
    }
  }

  for (const key in source) {
    // biome-ignore lint/complexity/useSimplifiedLogicExpression: <explanation>
    if (!isMergeableObject(source[key]) || !target[key]) {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key])
    } else {
      destination[key] = deepMergeRight(target[key], source[key])
    }
  }

  return destination
}

export function deepMergeRight(target, source) {
  const sourceIsArray = Array.isArray(source)
  const targetIsArray = Array.isArray(target)
  const sourceAndTargetTypesMatch = sourceIsArray === targetIsArray

  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source)
  }

  if (sourceIsArray) {
    return arrayMerge(target, source)
  }

  return mergeObject(target, source)
}
