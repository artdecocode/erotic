import erotic from '../src'

async function wait() {
  const cb = erotic()
  await new Promise((_, reject) => {
    setTimeout(() => {
      const error = cb('Promise timeout error.')
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