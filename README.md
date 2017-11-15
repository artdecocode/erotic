# erotic

[`erotic`][1] is a Node.js module to capture asynchronous stack traces.

You create a `callback` function by calling `erotic()` at the point where you
want you stack trace to start from. Then, in an asynchronous function you call
this the callback either with a `message` string or an `Error` object. The stack
trace will be updated to include the point of entry.

Start using [`erotic` npm package][1] today to get the benefits of more
user-friendly error messages from asynchronous function calls.

## API

The package's API consists of 2 functions: a constructor of a callback, which
should be used when the error stack trace should start, and the callback
which should be called in the asynchronous function.

### `erotic`

> `function(): callback`

Constructor for the error, where the stack trace will begin from.

```js
import erotic from 'erotic'

function example() {
    const callback = erotic()
}

example()
```

### `callback`

> `function(messageOrError: (string|Error)): Error`

The callback to get the error with the stack which includes the constructor
line.

```js
import erotic from 'erotic'

function example() {
    const callback = erotic()
    setTimeout(() => {
        const error = callback('some error')
        // or
        // const error = callback(new Error('some error'))
        throw error
    }, 10)
}

example()
```

```fs
/example/erotic.js:6
        throw err('some error')
        ^

Error: some error
    at Timeout.setTimeout [as _onTimeout] (/example/erotic.js:6:15)
    at example (/example/erotic.js:4:17)
    at Object.<anonymous> (/example/erotic.js:10:1)
```

## Using with Promises

One of the most common use cases is with promises. You can call `erotic`
function at your entry line, and reject a promise with an error created with
the callback.

```js
async function exampleWithPromise() {
    const err = erotic()
    await new Promise((_, reject) => {
        setTimeout(() => {
            const error = err('promise timeout error')
            reject(error)
        }, 10)
    })
}

(async () => {
    await exampleWithPromise()
})()
```

```fs
Error: promise timeout error
    at Timeout.setTimeout [as _onTimeout] (/Users/anton/Sobes/erotic/example/erotic.js:30:27)
    at exampleWithPromise (/Users/anton/Sobes/erotic/example/erotic.js:27:17)
    at __dirname (/Users/anton/Sobes/erotic/example/erotic.js:56:11)
    at Object.<anonymous> (/Users/anton/Sobes/erotic/example/erotic.js:57:3)
```

## Motivation

If `erotic` is not used, then the entry point to the async execution will not be
recorded in the error stack, and Node internals are exposed:

```js
function example() {
    setTimeout(() => {
        throw err('some error')
    }, 10)
}
```

```fs
/example/node.js:3
        throw new Error('some error')
        ^

Error: some error
    at Timeout.setTimeout [as _onTimeout] (/example/node.js:3:15)
    at ontimeout (timers.js:469:11)
    at tryOnTimeout (timers.js:304:5)
    at Timer.listOnTimeout (timers.js:264:5)
```

---

[1]: https://npmjs.org/packages/erotic

(c) [Sobesednik-Media](https://sobes.io) 2017
