import { readFile } from 'fs'
import erotic from '../src'

const read = async (path) => {
  const er = erotic(true)

  await new Promise((resolve, reject) => {
    readFile(path, (err, data) => {
      if (err) {
        const e = er(err)
        return reject(e)
      }
      return resolve(data)
    })
  })
}

(async function transparent() {
  const path = 'non-existent-file.txt'
  try {
    await read(path) // error appears to be thrown here
  } catch ({ stack }) {
    console.log(stack)
  }
})()