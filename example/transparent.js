import { readFile } from 'fs'
import erotic from '../src'

/* start example */
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
/* end example */

(async () => {
  const path = 'non-existent-file.txt'
  try {
    await read(path)
  } catch ({ stack }) {
    console.log(stack)
  }
})()