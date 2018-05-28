function isNonNullObject(value): boolean {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	const stringValue = Object.prototype.toString.call(value)

	return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value)
}

// https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
const canUseSymbol = typeof Symbol === 'function' && Symbol.for
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

export default function(value) {
	return isNonNullObject(value) && !isSpecial(value)
}
