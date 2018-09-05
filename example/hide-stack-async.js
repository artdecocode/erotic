import { hideStackAsync } from '../src'

const makeCall = async (arg) => {
  throw new Error(`An error has occurred: ${arg}.`)
}

const timeout = async (n = 10) => {
  await new Promise(r => setTimeout(r, n))
}

const asyncLib = async (arg) => {
  await timeout()
  await makeCall(arg)
}

(async function example() {
  try {
    await timeout()
    await hideStackAsync(asyncLib, 'test')
  } catch ({ stack }) {
    console.log(stack)
  }
})()