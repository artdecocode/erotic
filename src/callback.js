const {
    getCallerFromArguments, getCalleeStackLine, getStackHeading,
} = require('./lib')
const cleanStack = require('clean-stack')

/**
 * Create a callback
 * @function makeCallback
 * @param {function} entryCaller function which was called at entry
 * @param {string} entryStack first line of the error stack to be returned
 * @private
 */
function makeCallback(entryCaller, entryStack) {
    /**
     * This callback should be called when an asynchronous error occured.
     * @param {(string|Error)} messageOrError A message string or an Error object at
     * the point of actual error.
     * @returns {Error} An error with an updated stack which should be throw, or
     * rejected with.
     */
    function eroticCallback(messageOrError) {
        const caller = getCallerFromArguments(arguments)
        const { stack: errorStack } = new Error()
        const calleeStackLine = getCalleeStackLine(errorStack)
        const isError = messageOrError instanceof Error
        const message = isError ? messageOrError.message : messageOrError

        const stackHeading = getStackHeading(message)
        const entryHasCallee = entryCaller === caller
        const stackMessage = [stackHeading]
            .concat(entryHasCallee ?
                entryStack :
                [
                    calleeStackLine,
                    entryStack,
                ]
            ).join('\n')
        const stack = cleanStack(stackMessage)
        const properties = { message, stack }
        return Object.assign(new Error(), isError ?
            Object.assign({}, messageOrError, properties) :
            properties
        )
    }

    return eroticCallback
}

module.exports = {
    makeCallback,
}
