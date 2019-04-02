### Transparent Mode

In the transparent mode, the stack will start where the function was called and not show any of its internals.

%EXAMPLE: example/set-timeout-transparent, ../src => erotic%

%FORK example/set-timeout-transparent%

#### Use Case: Assertion Library

For example, when implementing an assertion library, uses will not want to see the details about how the error was created internally. They will only want to know that an error happened at a particular line in their test.
There will also be an internal _Node.js_ error stack, such as lines with `Module._compile` which are not useful.

Without `erotic`, the full error stack will be exposed:

%EXAMPLE: example/assert-node, ../src => erotic%

%FORK example/assert-node%

Whereas when using `erotic` to create a transparent error stack, the will be no indication of what happens inside the function, which can make things clearer.

%EXAMPLE: example/assert, ../src => erotic%

%FORK example/assert%