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

`erotic` solves the problem described in the Node example by remembering error stack at the point of where the function which through was called.

```js
const read = async (path) => {
  const er = erotic()
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
```

```
Error: ENOENT: no such file or directory, open 'non-existent-file.txt'
    at ReadFileContext.readFile [as callback] (/Users/zavr/adc/erotic/example/read-file.js:10:19)
    at read (/Users/zavr/adc/erotic/example/read-file.js:6:14)
    at /Users/zavr/adc/erotic/example/read-file.js:22:11
    at Object.<anonymous> (/Users/zavr/adc/erotic/example/read-file.js:26:3)
```

### `erotic`: Transparent Mode

A transparent mode can be used when it's needed to completely proxy the call to a function, and hide all underlying error stack, making the error appear to happen at the point where the throwing function was called.

```js
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
```

```
Error: ENOENT: no such file or directory, open 'non-existent-file.txt'
    at /Users/zavr/adc/erotic/example/transparent.js:23:11
    at Object.<anonymous> (/Users/zavr/adc/erotic/example/transparent.js:27:3)
```

## API

The package exports the default [`erotic` function](#erotic).

```js
import erotic from 'erotic'
```

## Copyright

Logo: [Thornton’s Temple of Flora][2]

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz
[2]: https://publicdomainreview.org/2015/03/11/sex-and-science-in-robert-thorntons-temple-of-flora/
