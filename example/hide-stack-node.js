const makeCall = (arg) => {
  throw new Error(`An error has occurred: ${arg}.`)
}

const syncLib = (arg) => {
  makeCall(arg)
}

(function example() {
  try {
    syncLib('test')
  } catch ({ stack }) {
    console.log(stack)
  }
})()