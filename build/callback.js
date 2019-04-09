let cleanStack = require('@artdeco/clean-stack'); if (cleanStack && cleanStack.__esModule) cleanStack = cleanStack.default;
const {
  getCallerFromArguments, getCalleeStackLine, getStackHeading,
} = require('./lib');

/**
 * Create a callback.
 * @param {!Function} entryCaller The function which was called at entry.
 * @param {string} entryStack The first line of the error stack to be returned
 * @param {boolean} [shadow=false] Print only entry stack.
 */
       function makeCallback(entryCaller, entryStack, shadow = false) {
  /**
   * This callback should be called when an asynchronous error occurred.
   * @param {(string|Error)} messageOrError A message string or an _Error_ object at the point of actual error.
   * @returns {Error} An error with the updated stack which includes the callee.
   */
  function cb(messageOrError) {
    const caller = getCallerFromArguments(arguments)
    const { stack: errorStack } = new Error()
    const calleeStackLine = getCalleeStackLine(errorStack)
    const isError = messageOrError instanceof Error
    const message = isError ? messageOrError.message : messageOrError

    const stackHeading = getStackHeading(message)
    const entryHasCallee = caller !== null && entryCaller === caller
    const stackMessage = [
      stackHeading,
      ...(entryHasCallee || shadow ? [entryStack] : [
        calleeStackLine,
        entryStack,
      ]),
    ].join('\n')

    const stack = cleanStack(stackMessage)
    const properties = { message, stack }
    const e = isError ? messageOrError : new Error()

    return /** @type {Error} */ (Object.assign(/** @type {!Object} */ (e), properties))
  }

  return cb
}

module.exports.makeCallback = makeCallback