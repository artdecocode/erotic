import { readFile } from 'fs'
import erotic from '../src'

async function read(path) {
  const er = erotic(true)
  await new Promise((r, j) => {
    readFile(path, (err, data) => {
      if (err) {
        const e = er(err)
        return j(e)
      }
      return r(data)
    })
  })
}

(async function readExample() {
  try {
    await read('random-file.txt')
  } catch ({ stack }) {
    console.log(stack) // eslint-disable-line

    // Error: test error
    //     at transparentExample (example/transparent.js)
  }
})()
