const erotic = require('../')
const { inspect } = require('util')

const printError = err => console.log(inspect(err, { colors: true }))
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

async function exampleWithPromise() {
    const err = erotic()
    await new Promise((_, reject) => {
        setTimeout(() => {
            const error = err('promise timeout error')
            reject(error)
        }, 10)
    })
}

async function promise() {
    await new Promise((_, reject) => {
        setTimeout(() => {
            const error = new Error('native promise timeout error')
            reject(error)
        }, 10)
    })
}

function native() {
    setTimeout(() => {
        throw new Error('some error')
    }, 10)
}

native()
example()
exampleWithError();

(async () => {
    await exampleWithPromise()
})();
(async () => {
    await promise()
})()

