const assert = require('assert')
const context = require('../context/StackContext')
const erotic = require('../../src/')
const { doesNotThrow, equal } = assert

const eroticTestSuite = {
    context,
    'should be a function'() {
        equal(typeof erotic, 'function')
    },
    'should call package without error'() {
        doesNotThrow(function doesNotThrow() {
            erotic()
        })
    },
    'should return error stack'({ removeLineNumbers, nodeLt }) {
        const e = erotic()
        const message = 'error-message'
        return new Promise((_, reject) => {
            setTimeout(function () {
                const eroticError = e(message)
                reject(eroticError)
            }, 1)
        }).catch(({ stack }) => {
            const s = removeLineNumbers(stack)
            // Timeout constructor name from 5.9.1
            // https://github.com/nodejs/node/pull/5793
            const expected = `Error: ${message}
    at ${nodeLt('v5.9.1') ? 'null' : 'Timeout'}._onTimeout
    at should return error stack`
            assert(s.startsWith(expected))
        })
    },
    'should return error stack with sync function'({ removeLineNumbers }) {
        const makeError = erotic()
        const message = 'error-message'
        const eroticError = makeError(message)
        try {
            throw eroticError
        } catch ({ stack }) {
            const s = removeLineNumbers(stack)
            const expected = `Error: ${message}
    at should return error stack with sync function`
            assert(s.startsWith(expected))
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
                }, 1)
            })
        } catch (error) {
            assert(error instanceof Error)
            equal(error.message, message)
            equal(error.code, code)
        }
    },
}

module.exports = eroticTestSuite
