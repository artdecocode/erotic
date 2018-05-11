import {
  getStackSegment, getEntryStack, getCalleeStackLine, getStackHeading,
  getCallerFromArguments,
} from '../../src/lib'
import assert from 'assert'
const { deepEqual, equal } = assert
import context, { Context } from '../context' // eslint-disable-line

/** @type {Object.<string, (ctx: Context)>} */
const T = {
  context,
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
      assert(/at Object.context/.test(res))
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
