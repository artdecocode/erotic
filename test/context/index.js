import { nodeLt } from 'noddy'

// simulating same process of creating an error in the erotic package
function eroticError(name, code) {
  const error = new Error(name)
  error.code = code
  return error
}

function getStackArray(stack) {
  return stack.split('\n')
}

function removeLineNumbers(stack) {
  const re = / \(.*\)$/gm
  const s = stack.replace(re, '')
  return s
}

async function rejectTimeout(
  t = 10,
  name = 'context async error',
  code = 'TEST_ASYNC_ERROR',
) {
  await new Promise((_, reject) => {
    setTimeout(function onTimeout() {
      const asyncError = eroticError(name, code)
      reject(asyncError)
    }, t)
  })
}

async function getTimeoutError() {
  try {
    await rejectTimeout()
  } catch (error) {
    return error
  }
}

export async function context() {
  const error = eroticError('context error', 'TEST_ERROR')
  const asyncError = await getTimeoutError()
  const [
    { stack },
    { stack: asyncStack },
  ] = [error, asyncError]
  const stackArray = getStackArray(stack)
  const asyncStackArray = getStackArray(asyncStack)

  Object.assign(this, {
    error,
    stack,
    stackArray,
    asyncError,
    asyncStack,
    asyncStackArray,
    removeLineNumbers,
    nodeLt,
  })
}


/**
 * @typedef {Object} Context
 * @property
 */


/** @type {Context} */
const Context = {}

export { Context }

/*
Error: context error
    at eroticError (/erotic/test/context/StackContext.js:3:19)
    at Object.StackContext (/erotic/test/context/StackContext.js:34:19)
    at Test._evaluateContext (/erotic/node_modules/zoroaster/src/test.js:85:33)
    at runTest (/erotic/node_modules/zoroaster/src/test.js:139:24)
    at Test.run (/erotic/node_modules/zoroaster/src/test.js:42:16)
    at acc.then (/erotic/node_modules/zoroaster/src/lib.js:13:30)
    at <anonymous>
Error: context async error
    at eroticError (/erotic/test/context/StackContext.js:3:19)
    at Timeout.onTimeout [as _onTimeout] (/erotic/test/context/StackContext.js:19:32)
    at ontimeout (timers.js:471:11)
    at tryOnTimeout (timers.js:306:5)
    at Timer.listOnTimeout (timers.js:266:5)
*/
