import { ok, doesNotThrow, equal } from 'assert'
import Context from '../context'
import erotic from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof erotic, 'function')
  },
  'calls package without error'() {
    doesNotThrow(() => {
      erotic()
    })
  },
  async 'returns error stack'({ removeLineNumbers, nodeLt }) {
    const e = erotic()
    const message = 'error-message'
    try {
      await new Promise((_, reject) => {
        setTimeout(function () {
          const eroticError = e(message)
          reject(eroticError)
        }, 1)
      })
    } catch ({ stack }) {
      const s = removeLineNumbers(stack)
      // Timeout constructor name from 5.9.1
      // https://github.com/nodejs/node/pull/5793
      const nl = nodeLt('v5.9.1')
      const expected = `Error: ${message}
    at ${nl ? 'null' : 'Timeout'}._onTimeout
    at returns error stack`
      ok(s.startsWith(expected))
    }
  },
  'returns error stack with sync function'({ removeLineNumbers }) {
    const makeError = erotic()
    const message = 'error-message'
    const eroticError = makeError(message)
    try {
      throw eroticError
    } catch ({ stack }) {
      const s = removeLineNumbers(stack)
      const expected = `Error: ${message}
    at returns error stack with sync function`
      ok(s.startsWith(expected))
    }
  },
  async 'extends passed error object'() {
    const er = erotic()
    const message = 'error-message'
    const code = 'TEST_ERROR'
    try {
      await new Promise((_, r) => {
        setTimeout(() => {
          const err = new Error(message)
          err.code = code
          const e = er(err)
          r(e)
        }, 1)
      })
    } catch (error) {
      ok(error instanceof Error)
      equal(error.message, message)
      equal(error.code, code)
    }
  },
  'uses only entry line when called synchronously'() {
    const er = erotic()
    const e = er('test')
    let m = 0
    e.stack.replace(
      /uses only entry line when called synchronously/g,
      () => { m++ }
    )
    equal(m, 1)
  },
}

export default T