import { hideStack } from '../src'

const makeCall = (arg) => {
  throw new Error(`An error has occurred: ${arg}.`)
}

const syncLib = (arg) => {
  makeCall(arg)
}

(function example() {
  try {
    syncLib('test')
    // hideStack(syncLib, 'test')
  } catch ({ stack }) {
    console.log(stack)
  }
})()