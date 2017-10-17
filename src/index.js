const cleanStack = require('clean-stack')

/**
 * Create a synchronous handle for a possible async error.
 * When the async error is caught, call error(message) method on the
 * returned object to get an error which stack trace starts when
 * the handle was created.
 */
function erotic() {
    const error = new Error()
    const stack = error.stack.split('\n')
    const rest = stack.splice(2).join('\n')


    return (message) => {
        const callee = new Error().stack.split('\n', 3)[2]
        const msg = `Error: ${message}\n${callee}\n${rest}`
        error.message = message
        error.stack = cleanStack(msg)
        return error
    }
}

module.exports = erotic
