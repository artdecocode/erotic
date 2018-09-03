
### Transparent Mode

In the transparent mode, the stack will start where the function was called and not show any of its internals.

%EXAMPLE: example/set-timeout-transparent.js, ../src => erotic%

%FORK example example/set-timeout-transparent%

#### Use Case: Assertion Library

For example, when implementing an assertion library, uses will not want to see the details about how the error was created internally. They will only want to know that an error happened at a particular line in their test.

Without `erotic`, the full error stack will be exposed:

%EXAMPLE: example/assert-node.js, ../src => erotic%

%FORK example example/assert-node%

Whereas when using `erotic` to create a transparent error stack, the will be no indication of what happens inside the function, which can make things clearer.

%EXAMPLE: example/assert.js, ../src => erotic%

%FORK example example/assert%