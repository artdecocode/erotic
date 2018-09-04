import { readFile } from 'fs'
import erotic from '../src'

const wait = async () => {
  await new Promise(r => setTimeout(r, 100))
  throw new Error('Example error.')
}

const waitWithStack = async () => {
  await new Promise(r => setTimeout(r, 100))
  const err = new Error('Example error.')
  throw err
}

(async function example() {
  try {
    await wait()
  } catch ({ stack }) {
    console.log(stack)
  }
})()