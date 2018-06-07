import { ok, deepEqual, equal } from 'assert'
import {
  getStackSegment, getEntryStack, getCalleeStackLine, getStackHeading,
  getCallerFromArguments,
} from '../../src/lib'
import Context from '../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  getStackSegment: {
    'returns all lines by default'({ stack }) {
      const res = getStackSegment(stack)
      deepEqual(res, stack)
    },
    'returns only the first line'({ stack, stackArray }) {
      const res = getStackSegment(stack, 0, true)
      const [expected] = stackArray
      equal(res, expected)
    },
    'returns only the second line'({ stack, stackArray }) {
      const res = getStackSegment(stack, 1, true)
      const [, expected] = stackArray
      equal(res, expected)
    },
    'returns first to last lines'({ stack, stackArray }) {
      const res = getStackSegment(stack, 1)
      const [, ...e] = stackArray
      const expected = e.join('\n')
      deepEqual(res, expected)
    },
    'returns second to last lines'({ stack, stackArray }) {
      const res = getStackSegment(stack, 2)
      const [, , ...e] = stackArray
      const expected = e.join('\n')
      deepEqual(res, expected)
    },
  },
  getEntryStack: {
    'returns the entry stack'({ stack, stackArray }) {
      const res = getEntryStack(stack)
      const [, , ...e] = stackArray
      const expected = e.join('\n')
      equal(res, expected)
    },
  },
  getCalleeStackLine: {
    'returns line of stack where it was called'({ stack }) {
      const res = getCalleeStackLine(stack)
      ok(/at Context._init/.test(res))
    },
  },
  getStackHeading: {
    'returns a new error heading'() {
      const res = getStackHeading('test-error')
      equal(res, 'Error: test-error')
    },
  },
  getCallerFromArguments: {
    'returns caller function from arguments'() {
      const caller = () => {
        function test() {
          return getCallerFromArguments(arguments)
        }
        return test()
      }
      const res = caller()
      equal(res, caller)
    },
  },
}

export default T
