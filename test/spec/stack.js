import { throws, equal, ok } from 'zoroaster/assert'
import { hideStack, hideStackAsync } from '../../src'
import Context from '../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'hides error stack'() {
    const testThrows = () => {
      throw new Error('test-error')
    }
    await throws({
      fn: hideStack,
      args: testThrows,
      stack(stack) {
        const lines = stack.split('\n')
        equal(lines.length, 2)
        const [heading, line] = lines
        equal(heading, 'Error: test-error')
        ok(/at testThrows/.test(line))
      },
    })
  },
  async 'hides error stack (async)'() {
    const testThrows = async () => {
      throw new Error('test-error')
    }
    await throws({
      fn: hideStackAsync,
      args: testThrows,
      stack(stack) {
        const lines = stack.split('\n')
        equal(lines.length, 2)
        const [heading, line] = lines
        equal(heading, 'Error: test-error')
        ok(/at testThrows/.test(line))
      },
    })
  },
}

export default T
