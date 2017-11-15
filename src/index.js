const {
    getEntryStack, getCallerFromArguments,
} = require('./lib')
const { makeCallback } = require('./callback')

/**
 * Call this method to get a function that will return an error with a stack
 * trace starting at the line in code when the call was made.
 */
function erotic() {
    const error = new Error()
    const caller = getCallerFromArguments(arguments)
    const entryStack = getEntryStack(error.stack)

    return makeCallback(caller, entryStack)
}

module.exports = erotic
