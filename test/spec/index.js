import { ok, doesNotThrow, equal } from 'assert'
import context, { Context } from '../context' // eslint-disable-line

const defaultLib = '../../src'
const { LIB_MAIN = defaultLib } = process.env
const { default: erotic } = require(LIB_MAIN)

if (LIB_MAIN != defaultLib) {
  console.log('using lib @ %s', LIB_MAIN) // eslint-disable-line
}

/** @type {Object.<string, (ctx: Context)>} */
const T = {
  context,
  'should be a function'() {
    equal(typeof erotic, 'function')
  },
  'should call package without error'() {
    doesNotThrow(function doesNotThrow() {
      erotic()
    })
  },
  async 'returns error stack'({ removeLineNumbers, nodeLt }) {
    const e = erotic()
    const message = 'error-message'
    await new Promise((_, reject) => {
      setTimeout(function () {
        const eroticError = e(message)
        reject(eroticError)
      }, 1)
    }).catch(({ stack }) => {
      const s = removeLineNumbers(stack)
      // Timeout constructor name from 5.9.1
      // https://github.com/nodejs/node/pull/5793
      const nl = nodeLt('v5.9.1')
      const expected = `Error: ${message}
    at ${nl ? 'null' : 'Timeout'}._onTimeout
    at returns error stack`
      ok(s.startsWith(expected))
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
      ok(s.startsWith(expected))
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
      ok(error instanceof Error)
      equal(error.message, message)
      equal(error.code, code)
    }
  },
}

export default T
