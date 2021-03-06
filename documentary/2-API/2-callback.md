```### Callback => Error
[
  ["messageOrError", "string|Error"]
]
```

Returns an error with the remembered stack to be thrown. In the example below, a function is created which can throw at some point in future, but its stack trace will begin inside the call to it and not at Node's `setTimeout` internals.

When the callback is called with an error, the error's stack is overridden with a new stack, but all other properties are preserved, and the error is strictly equal to the one passed.

%EXAMPLE: example/set-timeout, ../src => erotic%

%FORK example/set-timeout%

When a string is passed, an error object is created with the message internally.

%EXAMPLE: example/set-timeout-string, ../src => erotic%

%FORK example/set-timeout-string%

#### Strict Mode

The `erotic` also works fine even in the `strict` mode.

%EXAMPLE: example/set-timeout-strict, ../src => erotic%

%FORK example/set-timeout-strict%