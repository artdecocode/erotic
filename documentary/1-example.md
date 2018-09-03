
## Quick Examples

The following examples show the benefits of using `erotic`.

### Node.js: Reading A File

When reading a file with Node's `readFile` method from the `fs` package, the function will be rejected without any error stack, which can make tracing errors harder in the application.

%EXAMPLE: example/node.js, ../src => erotic%

%FORK example example/node%

### `erotic`: Standard Mode

`erotic` solves the problem described in the _Node.js_ example above by remembering the error stack at the point of where the function was called.

%EXAMPLE: example/read-file.js, ../src => erotic%

%FORK example example/read-file%

### `erotic`: Transparent Mode

A transparent mode can be used when it's needed to completely proxy the call to a function, and hide all underlying error stack, making the error appear to happen at the point where the throwing function was called.

%EXAMPLE: example/transparent.js, ../src => erotic%

%FORK example example/transparent%
