/** yarn example-transparent */
import run from './async-run'

/**
 * Transparent mode allows to throw an error from the line where the function
 * which uses erotic to remember errors stack traces was called from.
 */

(async function transparentExample() {
  try {
    await run({
      transparent: true,
    })
  } catch ({ stack }) {
    console.log(stack) // eslint-disable-line

    // Error: test error
    //     at transparentExample (example/transparent.js)
  }
})()
