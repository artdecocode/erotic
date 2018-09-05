
/**
 * Merge 2 stacks, where the first one was ended at anonymous.
 * @param {string} stack1 An asynchronous error which can end with at <anonymous>
 * @param {string} stack2
 */
const mergeStacks = (stack1, stack2) => {
  if (!stack1.endsWith('at <anonymous>')) {
    return stack1
  }
  const lines = stack1.split('\n')
  const linesToUse = lines.slice(1, -1)
  const i = stack2.indexOf('\n')
  const [start, end] = [stack2.substr(0, i), stack2.substring(i + 1)]
  const res = [start, ...linesToUse, end]
  const s = res.join('\n')
  return s
}


/**
 * Hide the error stack beneath the point where this function was called.
 * @param {function} fn A function to call.
 * @param  {...any} args Arguments to the function.
 */
export const hideStack = (fn, ...args) => {
  const { stack: hideErrorStack } = new Error('hide-stack')
  try {
    const res = fn(...args)
    return res
  } catch (e) {
    const stack = getUpdatedStack(e, hideErrorStack)
    e.stack = stack
    throw e
  }
}

/**
 * Hide the error stack beneath the point where this function was called.
 * @param {function} fn A function to call.
 * @param  {...any} args Arguments to the function.
 */
export const hideStackAsync = async (fn, ...args) => {
  const { stack: hideErrorStack } = new Error('hide-stack')
  try {
    const res = await fn(...args)
    return res
  } catch (e) {
    const stack = getUpdatedStack(e, hideErrorStack)
    e.stack = stack
    throw e
  }
}

const getIndex = (stack, line) => {
  const i = stack.indexOf(line)
  return i
}

const getUpdatedStack = (error, hideErrorStack) => {
  const [,,commonLine] = hideErrorStack.split('\n')
  const i = getIndex(error.stack, commonLine)
  /** @type {string} */
  if (i == -1) {
    return error.stack
  } else {
    let s = error.stack.substr(0, i - 1)
    const li = s.lastIndexOf('\n')
    s = s.substr(0, li)
    return s
  }
}