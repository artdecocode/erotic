# erotic

`erotic` is a Node.js package to capture asynchronous stack traces.

## `erotic(): function(): Error`

Call `erotic` in the synchronous part of your function execution to get a
function which can be used to construct an error with captured stack trace.

```js
const erotic = require('erotic')

function example() {
    const err = erotic()
    setTimeout(() => {
        throw err('some error')
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

If `erotic` is not used, the entry point to the async execution will not be
recorded in the error stack:

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

(c) [Sobesednik-Media](https://sobes.io) 2017
