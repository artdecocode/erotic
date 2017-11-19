const erotic = require('../es5/src')
const inspect = require('util').inspect

const printError = err => console.log(err.stack)
process
    .on('unhandledRejection', printError)
    .on('uncaughtException', printError)

function example() {
    const err = erotic()
    setTimeout(() => {
        throw err('example error')
    }, 10)
}

function exampleWithError() {
    const err = erotic()
    setTimeout(() => {
        const error = new Error('timeout error')
        error.code = 'TIMEOUT_ERROR'
        throw err(error)
    }, 10)
}

function native() {
    setTimeout(() => {
        throw new Error('some error')
    }, 10)
}

example()
exampleWithError()
native()
