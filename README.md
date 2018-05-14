<a href="https://artdeco.bz/erotic"><img align="right" src="./logo.jpg" width="225" alt="Erotic" />

# erotic</a>

[![npm version](https://badge.fury.io/js/erotic.svg)](https://badge.fury.io/js/erotic)

```
yarn add -E erotic
```

[`erotic`][1] is a Node.js module to capture asynchronous errors as if they occured synchronously.

You create a `callback` function by calling `erotic()` at the point where you
want your stack trace to start from. Then, in an asynchronous function you call
this callback either with a `message` string or an `Error` object. The stack
trace will be updated to include the point of entry. With `transparent` mode,
functions can pretend they threw when they were called.

Start using [`erotic` npm package][1] today to get the benefits of more
user-friendly error messages from asynchronous function calls.

## Quick Example

Reading a file without `erotic`:

```js
async function read(path) {
  await new Promise((r, j) => {
    readFile(path, (err, data) => {
      if (err) {
        return j(err)
      }
      return r(data)
    })
  })
}
```

```fs
Error: ENOENT: no such file or directory, open 'random-file.txt'
```

Reading a file with `erotic`:

```js
async function read(path) {
  const er = erotic()
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
```

```fs
Error: ENOENT: no such file or directory, open 'random-file.txt'
    at ReadFileContext.callback (example/read-file.js)
    at read (example/read-file.js)
    at readExample (example/read-file.js)
```

Reading a file with `erotic` in transparent mode:

```js
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
```

```fs
Error: ENOENT: no such file or directory, open 'random-file.txt'
    at readExample (example/read-file.js)
```

## API

The package's _API_ consists of 2 functions: a constructor of a callback, which needs to be called at the point where the error stack should start, and the callback which should be called in the asynchronous function before rejecting with an error.

### `erotic`

> `function(transparent:boolean = false): callback`

Creates a callback which should be used before throwing any errors to make their stack appear at this point of creation of the callback. `transparent` can be used to hide this line also and make the function's errors' call stacks start at the caller's line.

When creating a library which runs some asynchronous code, the callback should be created when entering the function's body, and called at some point in future to update an error's stack before throwing.

```js
import erotic from 'erotic'

export default async function asyncRun({
  transparent = false,
  error = false,
  message = 'test error',
} = {}) {
  const cb = erotic(transparent)

  // ...
  // see callback API below for continuation
}
```

### `callback`

> `function(messageOrError: string|Error): Error`

Returns the error with remembered stack to be thrown. For example, we want to create a function which can throw at some point in future, but we also need its stack trace to begin inside the call to the function at not at Node's setTimeout internals. `erotic` callback accepts either an error object, or a string and builds a new error.

```js
import erotic from 'erotic'

export default async function asyncRun({
  transparent = false,
  error = false,
  message = 'test error',
} = {}) {
  const cb = erotic(transparent)

  await new Promise((_, r) => {
    setTimeout(() => {
      let er
      // @ see rejecting with an error
      if (error) {
        const arg = new Error(message)
        er = cb(arg)
      // @ see rejecting with a message
      } else {
        er = cb(message)
      }
      r(er)
    }, 100)
  })
}
```

### Rejecting with a Message

When callback is called with a message, a new error will be created.

```js
/** yarn example/message.js */
import run from './async-run'

(async function messageExample() {
  try {
    await run({
      message: 'test message',
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```fs
Error: test message
    at Timeout.setTimeout (example/async-run.js:17:14)
    at asyncRun (example/async-run.js:8:14)
    at messageExample (example/message.js:6:11)
```

### Rejecting with an Error

When callback is called with an error, the error's stack is overridden with a new stack, but all other properties are preserved, and the error is strictly equal to the one passed.

```js
/** yarn example/error.js */
import run from './async-run'

(async function errorExample() {
  try {
    await run({
      error: true
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```fs
Error: test error
    at Timeout.setTimeout (example/async-run.js:15:14)
    at asyncRun (example/async-run.js:8:14)
    at errorExample (example/error.js:6:11)
```

### transparent: boolean

In transparent mode, the stack will start where the function was called and not show any of its internals.

```js
/** yarn example/transparent.js */
import run from './async-run'

(async function transparentExample() {
  try {
    await run({
      transparent: true,
    })
  } catch ({ stack }) {
    console.log(stack) // eslint-disable-line
  }
})()
```

```fs
Error: test error
    at transparentExample (example/transparent.js:11:11)
```

## Using with Promises

One of the most common use cases is with promises. You can call `erotic` function at your function's entry line, and reject a promise with an error returned by the callback.

```js
import { readFile } from
async function exampleWithPromise() {
  const cb = erotic()
  await new Promise((_, reject) => {
    setTimeout(() => {
      const e = cb('promise timeout error')
      reject(e)
    }, 10)
  })
}

(async () => {
  await exampleWithPromise()
})()
```

```fs
Error: promise timeout error
    at Timeout.setTimeout [as _onTimeout] (artdeco/erotic/example/erotic.js:30:27)
    at exampleWithPromise (artdeco/erotic/example/erotic.js:27:17)
```

## Motivation

If `erotic` is not used, then the entry point to the async execution will not be recorded in the error stack, and Node.js internals are exposed instead of the code that we wrote:

```js
function native() {
  setTimeout(() => {
    throw new Error('some error')
  }, 10)
}
```

```fs
Error: some error
    at Timeout.setTimeout (example/erotic.js:48:11)
    at ontimeout (timers.js:482:11)
    at tryOnTimeout (timers.js:317:5)
    at Timer.listOnTimeout (timers.js:277:5)
```

When `erotic` callback is used, the error stack looks like what we want it to look like.

```js
function example() {
  const cb = erotic()
  setTimeout(() => {
    const err = cb('erotic error')
    throw err
  }, 10)
}
```

```fs
Error: erotic error
    at Timeout.setTimeout (example/erotic.js:12:17)
    at example (example/erotic.js:10:14)
```

## ES5

> THIS SHOULD NOT BE USED. THIS IS BEING REMOVED. USE LATEST NODE.
The package uses some newer language features. For your convenience, it's been
transpiled to be compatible with Node 4. You can use the following snippet.

Transparency feature is not supported.

```js
const erotic = require('erotic/es5')
```

---

Logo: [Thornton’s Temple of Flora][2]

(c) [Art Deco Code][3] 2018

[1]: https://npmjs.org/packages/erotic
[2]: https://publicdomainreview.org/2015/03/11/sex-and-science-in-robert-thorntons-temple-of-flora/
[3]: https://artdeco.bz
