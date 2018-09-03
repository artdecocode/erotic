<a href="https://artdeco.bz/erotic"><img align="right" src="./logo.jpg" width="225" alt="Erotic" />

# erotic</a>

[![npm version](https://badge.fury.io/js/erotic.svg)](https://npmjs.org/package/erotic)

`erotic` is a Node.js package to capture asynchronous errors as if they occurred synchronously, which aims at keeping the error stack readable and developer-friendly.

```
yarn add -E erotic
```

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Quick Examples](#quick-examples)
  * [Node.js: Reading A File](#nodejs-reading-a-file)
  * [`erotic`: Standard Mode](#erotic-standard-mode)
  * [`erotic`: Transparent Mode](#erotic-transparent-mode)
- [API](#api)
  * [`erotic(transparent?: boolean): Callback`](#erotictransparent-boolean-callback)
  * [`Callback(messageOrError: string|Error): Error`](#callbackmessageorerror-stringerror-error)
  * [Transparent Mode](#transparent-mode)
- [Copyright](#copyright)

## Quick Examples

The following examples show the benefits of using `erotic`.

### Node.js: Reading A File

When reading a file with Node's `readFile` method from the `fs` package, the function will be rejected without any error stack, which can make tracing errors harder in the application.

```js
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
```

```
Error: ENOENT: no such file or directory, open 'non-existent-file.txt'
```

### `erotic`: Standard Mode

`erotic` solves the problem described in the _Node.js_ example above by remembering the error stack at the point of where the function was called.

```js
import { readFile } from 'fs'
import erotic from 'erotic'

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

(async function example() {
  const path = 'non-existent-file.txt'
  try {
    await read(path)
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: ENOENT: no such file or directory, open 'non-existent-file.txt'
    at ReadFileContext.readFile [as callback] (/Users/zavr/adc/erotic/example/read-file.js:10:19)
    at read (/Users/zavr/adc/erotic/example/read-file.js:5:14)
    at example (/Users/zavr/adc/erotic/example/read-file.js:21:11)
    at Object.<anonymous> (/Users/zavr/adc/erotic/example/read-file.js:25:3)
```

### `erotic`: Transparent Mode

A transparent mode can be used when it's needed to completely proxy the call to a function, and hide all underlying error stack, making the error appear to happen at the point where the throwing function was called.

```js
import { readFile } from 'fs'
import erotic from 'erotic'

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

(async function example() {
  const path = 'non-existent-file.txt'
  try {
    await read(path) // error appears to be thrown here
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: ENOENT: no such file or directory, open 'non-existent-file.txt'
    at example (/Users/zavr/adc/erotic/example/transparent.js:21:11)
    at Object.<anonymous> (/Users/zavr/adc/erotic/example/transparent.js:25:3)
```

## API

The package exports the default `erotic` function.

```js
import erotic from 'erotic'
```

### `erotic(`<br/>&nbsp;&nbsp;`transparent?: boolean,`<br/>`): Callback`

Creates a callback which should be used before throwing any errors to make their stack appear at the point of creation of the callback. The `transparent` option can be used to hide this line also and make the function's errors' stacks start at the caller's line.

When creating a library which runs some asynchronous code, the callback should be created when entering the function's body, and called at some point in future to update an error's stack before throwing.

### `Callback(`<br/>&nbsp;&nbsp;`messageOrError: string|Error,`<br/>`): Error`

Returns an error with the remembered stack to be thrown. In the example below, a function is created which can throw at some point in future, but its stack trace will begin inside the call to it and not at Node's `setTimeout` internals.

When the callback is called with an error, the error's stack is overridden with a new stack, but all other properties are preserved, and the error is strictly equal to the one passed.

```js
import erotic from 'erotic'

async function wait() {
  const cb = erotic()
  await new Promise((_, reject) => {
    setTimeout(() => {
      const err = new Error('Promise timeout error.')
      err.code = 'ETIMEOUT'
      const error = cb(err)
      reject(error)
    }, 10)
  })
}

(async function example() {
  try {
    await wait()
  } catch ({ stack, code }) {
    console.log(stack)
    console.log(code)
  }
})()
```

```
Error: Promise timeout error.
    at Timeout.setTimeout [as _onTimeout] (/Users/zavr/adc/erotic/example/set-timeout.js:9:21)
    at wait (/Users/zavr/adc/erotic/example/set-timeout.js:4:14)
    at example (/Users/zavr/adc/erotic/example/set-timeout.js:17:11)
    at Object.<anonymous> (/Users/zavr/adc/erotic/example/set-timeout.js:22:3)
ETIMEOUT
```

When a string is passed, an error object is created with the message internally.

```js
import erotic from 'erotic'

async function wait() {
  const cb = erotic()
  await new Promise((_, reject) => {
    setTimeout(() => {
      const error = cb('Promise timeout error.')
      reject(error)
    }, 10)
  })
}

(async function example() {
  try {
    await wait()
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: Promise timeout error.
    at Timeout.setTimeout [as _onTimeout] (/Users/zavr/adc/erotic/example/set-timeout-string.js:7:21)
    at wait (/Users/zavr/adc/erotic/example/set-timeout-string.js:4:14)
    at example (/Users/zavr/adc/erotic/example/set-timeout-string.js:15:11)
    at Object.<anonymous> (/Users/zavr/adc/erotic/example/set-timeout-string.js:19:3)
```

### Transparent Mode

In the transparent mode, the stack will start where the function was called and not show any of its internals.

```js
import erotic from 'erotic'

async function wait() {
  const cb = erotic(true)
  await new Promise((_, reject) => {
    setTimeout(() => {
      const error = cb('Promise timeout error.')
      reject(error)
    }, 10)
  })
}

(async function example() {
  try {
    await wait()
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: Promise timeout error.
    at example (/Users/zavr/adc/erotic/example/set-timeout-transparent.js:15:11)
    at Object.<anonymous> (/Users/zavr/adc/erotic/example/set-timeout-transparent.js:19:3)
```

## Copyright

Logo: [Thornton’s Temple of Flora][2]

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz
[2]: https://publicdomainreview.org/2015/03/11/sex-and-science-in-robert-thorntons-temple-of-flora/
