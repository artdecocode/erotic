import erotic from '..'

const printError = ({ stack }) => console.log(stack)

process
  .on('unhandledRejection', printError)
  .on('uncaughtException', printError)


function native() {
  setTimeout(() => {
    throw new Error('some error')
  }, 10)
}

function example() {
  const cb = erotic()
  setTimeout(() => {
    const err = cb('erotic error')
    throw err
  }, 10)
}

function exampleWithError() {
  const cb = erotic()
  setTimeout(() => {
    const error = new Error('timeout error')
    error.code = 'TIMEOUT_ERROR'
    const err = cb(error)
    throw err
  }, 10)
}

async function exampleWithPromise() {
  const cb = erotic()
  await new Promise((_, reject) => {
    setTimeout(() => {
      const error = cb('promise timeout error')
      reject(error)
    }, 10)
  })
}

async function promise() {
  await new Promise((_, reject) => {
    setTimeout(() => {
      const error = new Error('promise without erotic timeout error')
      reject(error)
    }, 10)
  })
}

native()
example()
exampleWithError();

(async () => {
  await exampleWithPromise()
})();

(async () => {
  await promise()
})()
