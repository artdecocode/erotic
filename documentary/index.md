<a href="https://artdeco.bz/erotic"><img align="right" src="./logo.jpg" width="225" alt="Erotic" />

# erotic</a>

%NPM: erotic%

`erotic` is a Node.js package to capture asynchronous errors as if they occurred synchronously. It aims at keeping the error stack readable and developer-friendly. Furthermore, it can make errors appear as if they happened outside of the function at the point of call.

<!-- You create a `callback` function by calling `erotic()` at the point where you want your stack trace to start from. Then, in an asynchronous function you call this callback either with a `message` string or an `Error` object. The stack trace will be updated to include the point of entry. With `transparent` mode, functions can pretend they threw when they were called. -->

```
yarn add -E erotic
```

## Table of Contents

%TOC%