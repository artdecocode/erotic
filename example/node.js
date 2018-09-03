import { readFile } from 'fs'

const read = async (path) => {
  await new Promise((resolve, reject) => {
    readFile(path, (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  })
}

(async () => {
  const path = 'non-existent-file.txt'
  try {
    await read(path)
  } catch ({ stack }) {
    console.log(stack)
  }
})()