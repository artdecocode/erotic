
```### erotic => Callback
[
  ["transparent?", "boolean"]
]
```

Creates a callback which should be used before throwing any errors to make their stack appear at the point of creation of the callback. The `transparent` option can be used to hide this line also and make the function's errors' stacks start at the caller's line.

When creating a library which runs some asynchronous code, the callback should be created when entering the function's body, and called at some point in future to update an error's stack before throwing.
