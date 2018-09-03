import { readFile } from 'fs'
import erotic from '../src'

const read = async (path) => {
  const er = erotic() // stack has the anchor point

  await new Promise((resolve, reject) => {
    readFile(path, (err, data) => {
      if (err) {
        const e = er(err) // stack also includes this line
        return reject(e)
      }
      return resolve(data)
    })
  })
}

(async function readWithErotic() {
  const path = 'non-existent-file.txt'
  try {
    await read(path)
  } catch ({ stack }) {
    console.log(stack)
  }
})()