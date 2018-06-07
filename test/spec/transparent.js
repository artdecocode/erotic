/* global ES5 */
import { ok } from 'assert'
import erotic from '../../src'

const lib = async ({
  message,
  error,
} = {}) => {
  const cb = erotic(true)
  await new Promise((_, r) => {
    setTimeout(() => {
      let arg
      if (message) {
        arg = message
      } else if (error) {
        arg = error
      } else {
        const e = new Error('test error')
        arg = e
      }
      const er = cb(arg)
      r(er)
    }, 10)
  })
}

const T = {
  context() {
    if (ES5) throw new Error('not supported')
  },
  async 'allows to make transparent errors'() {
    try {
      await lib()
    } catch ({ stack }) {
      const [, l] = stack.split('\n', 2)
      ok(/allows to make transparent errors/.test(l))
    }
  },
  async 'allows to make transparent passed message'() {
    const message = ' test message '
    try {
      await lib({
        message,
      })
    } catch ({ stack }) {
      const [, l] = stack.split('\n', 2)
      ok(/allows to make transparent passed message/.test(l))
    }
  },
  async 'allows to make transparent passed error'() {
    const error = new Error(' test message ')
    try {
      await lib({
        error,
      })
    } catch ({ stack }) {
      const [, l] = stack.split('\n', 2)
      ok(/allows to make transparent passed error/.test(l))
    }
  },
}

export default T
