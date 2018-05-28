import isMergeableObject from './isMergeableObject'

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value) {
	return isMergeableObject(value) ? deepmerge(emptyTarget(value), value) : value
}

function arrayMerge(target, source) {
	return target.concat(source).map(element => cloneUnlessOtherwiseSpecified(element))
}

function mergeObject(target, source) {
  const destination = {}

	if (isMergeableObject(target)) {
		Object.keys(target).forEach(key => destination[key] = cloneUnlessOtherwiseSpecified(target[key]))
  }

	Object.keys(source).forEach(key => {
		if (!isMergeableObject(source[key]) || !target[key]) {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key])
		} else {
			destination[key] = deepmerge(target[key], source[key])
		}
  })

	return destination
}

export default function deepmerge(target, source) {
	var sourceIsArray = Array.isArray(source)
	var targetIsArray = Array.isArray(target)
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source)
	} else if (sourceIsArray) {
		return arrayMerge(target, source)
	} else {
		return mergeObject(target, source)
	}
}
