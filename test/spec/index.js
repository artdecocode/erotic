const assert = require('assert')
const erotic = require('../../src/')
const { doesNotThrow, equal } = assert

const eroticTestSuite = {
    'should be a function'() {
        equal(typeof erotic, 'function')
    },
    'should call package without error'() {
        doesNotThrow(function doesNotThrow() {
            erotic()
        })
    },
    async 'should return error stack'() {
        const e = erotic()
        const message = 'error-message'
        try {
            await new Promise((_, reject) => {
                setTimeout(() => {
                    const eroticError = e(message)
                    reject(eroticError)
                }, 1)
            })
        }
        catch({ stack }) {
            const expected = `Error: ${message}
    at Timeout.setTimeout [as _onTimeout] (${__dirname}/index.js:20:41)
    at should return error stack (${__dirname}/index.js:15:19)`
            assert(stack.startsWith(expected))
        }
    },
    'should return error stack with sync function'() {
        const makeError = erotic()
        const message = 'error-message'
        const eroticError = makeError(message)
        try {
            throw eroticError
        } catch ({ stack }) {
            const expected = `Error: ${message}
    at should return error stack with sync function (${__dirname}/index.js:33:27)`
            assert(stack.startsWith(expected))
        }
    },
    async 'should extend passed error object'() {
        const er = erotic()
        const message = 'error-message'
        const code = 'TEST_ERROR'
        try {
            await new Promise((_, reject) => {
                setTimeout(() => {
                    const err = new Error(message)
                    err.code = code
                    const eroticError = er(err)
                    reject(eroticError)
                }, 10)
            })
        } catch(error) {
            assert(error instanceof Error)
            equal(error.message, message)
            equal(error.code, code)
        }
    },
}

module.exports = eroticTestSuite
