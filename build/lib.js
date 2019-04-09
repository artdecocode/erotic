const getLastItem = (array) => {
  const item = array[array.length - 1]
  return item
}
const getItemsFrom = (array, from) => array.slice(from)

/**
 * Get a segment of the stack string, defaults are from = 0 and oneLine = false.
 * @param {string} stack the stack string
 * @param {number} [from=0] index from which to slice from
 * @param {boolean} [oneLine=false] Whether just first line must be returned
 * @returns {string} A stack segment starting from the specified line.
 */
       const getStackSegment = (stack, from = 0, oneLine = false) => {
  if (from === 0 && !oneLine) {
    return stack
  }
  const splitStack = stack
    .split('\n', oneLine ? from + 1 : undefined)
  if (oneLine) {
    const line = getLastItem(splitStack)
    return line
  } else {
    const items = getItemsFrom(splitStack, from)
    return items.join('\n')
  }
}

/**
 * Get the stack trace part of when the erotic function was called. Disregards
 * first two lines.
 * @param {string} stack error's stack
 * @param {boolean} [transparent] trim the top line as well
 * @returns {string} A part of stack
 */
       const getEntryStack = (stack, transparent = false) => {
  const stackSegment = getStackSegment(stack, 2 + (transparent ? 1 : 0))
  return stackSegment
}

/**
 * Get stack line of where the callback was called.
 * @param {string} stack Stack string.
 * @returns {string} Stack line.
 */
       const getCalleeStackLine = (stack) => {
  const calleeStackLine = getStackSegment(stack, 2, true)
  return calleeStackLine
}

       const getStackHeading = message => `Error: ${message}`

/**
 * Extract caller from the function's `arguments`.
 * @param {Object} args arguments
 * @returns {!Function} The caller function from `arguments.callee.caller`.
 */
       const getCallerFromArguments = (args) => {
  const { callee: { caller } } = args
  return caller
}

module.exports.getStackSegment = getStackSegment
module.exports.getEntryStack = getEntryStack
module.exports.getCalleeStackLine = getCalleeStackLine
module.exports.getStackHeading = getStackHeading
module.exports.getCallerFromArguments = getCallerFromArguments