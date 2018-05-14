/** yarn example-error */
import run from './async-run'

(async function errorExample() {
  try {
    await run({
      error: true,
    })
  } catch ({ stack, code }) {
    console.log(stack) // eslint-disable-line

    // Error: test error
    //     at Timeout.setTimeout (example/async-run.js)
    //     at asyncRun (example/async-run.js)
    //     at errorExample (example/error.js)
  }
})()
