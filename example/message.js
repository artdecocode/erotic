/** yarn example-message */
import run from './async-run'

(async function messageExample() {
  try {
    await run({
      message: 'test message',
    })
  } catch ({ stack }) {
    console.log(stack) // eslint-disable-line

    // Error: test message
    //     at Timeout.setTimeout (example/async-run.js)
    //     at asyncRun (example/async-run.js)
    //     at messageExample (example/message)
  }
})()
