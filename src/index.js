import {
  getEntryStack, getCallerFromArguments,
} from './lib'
import { makeCallback } from './callback'

/**
 * Returns a function to create an error with a stack trace starting at the line in code when the call was made by the callee.
 * @param {boolean} [transparent] Pretend as if the call to the function lead to the error, without exposing any of the internal stack.
 */
export default function erotic(transparent) {
  const { stack } = new Error()
  const caller = getCallerFromArguments(arguments)
  const entryStack = getEntryStack(stack, transparent)

  return makeCallback(caller, entryStack, transparent)
}

/**
 * Hide the error stack beneath the point where this function was called.
 * @param {function} fn A function to call.
 * @param  {...any} args Arguments to the function.
 */
export const hideStack = (fn, ...args) => {
  const err = new Error('hide-stack')
  const [,, j] = err.stack.split('\n', 3)
  try {
    const res = fn(...args)
    return res
  } catch (e) {
    hideErrorStack(e, j)
    throw e
  }
}

/**
 * Hide the error stack beneath the point where this function was called.
 * @param {function} fn A function to call.
 * @param  {...any} args Arguments to the function.
 */
export const hideStackAsync = async (fn, ...args) => {
  const err = new Error('hide-stack')
  const [,, j] = err.stack.split('\n', 3)
  try {
    const res = await fn(...args)
    return res
  } catch (e) {
    hideErrorStack(e, j)
    throw e
  }
}

const hideErrorStack = (error, j) => {
  const { stack } = error
  const i = stack.indexOf(j)
  /** @type {string} */
  const s = stack.substr(0, i - 1)
  const li = s.lastIndexOf('\n')
  const t = s.substr(0, li)
  error.stack = t
}