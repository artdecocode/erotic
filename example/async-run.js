import erotic from '../src'

export default async function asyncRun({
  transparent = false,
  error = false,
  message = 'test error',
} = {}) {
  const cb = erotic(transparent)

  await new Promise((_, r) => {
    setTimeout(() => {
      let er
      if (error) {
        const arg = new Error(message)
        er = cb(arg)
      } else {
        er = cb(message)
      }
      r(er)
    }, 100)
  })
}
