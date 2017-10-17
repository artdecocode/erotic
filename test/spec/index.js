const assert = require('assert')
const erotic = require('../../src/')

const eroticTestSuite = {
    'should be a function': () => {
        assert.equal(typeof erotic, 'function')
    },
    'should call package without error': () => {
        assert.doesNotThrow(() => {
            erotic()
        })
    },
    'should return error stack': () => {
        const error = erotic()
        const msg = 'error-message'
        return new Promise((_, reject) => {
            setTimeout(() => {
                reject(error(msg))
            }, 10)
        })
            .then(() => {
                throw new Error('expecting a new error')
            })
            .catch((error) => {
                const expected = `
Error: ${msg}
    at Timeout.setTimeout [as _onTimeout] (${__dirname}/index.js:18:24)
    at should return error stack (${__dirname}/index.js:14:23)`
                    .trim()
                assert(error.stack.indexOf(expected) === 0)
            })
    },
}

module.exports = eroticTestSuite
