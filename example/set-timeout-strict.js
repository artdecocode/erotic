'use strict'

import erotic from '../src'

const wait = async () => {
  const cb = erotic()
  await new Promise((_, reject) => {
    setTimeout(() => {
      const err = new Error('Promise timeout error.')
      const error = cb(err)
      reject(error)
    }, 10)
  })
}

(async function example() {
  try {
    await wait()
  } catch ({ stack }) {
    console.log(stack)
  }
})()