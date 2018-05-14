const defaultLib = '../../src'
const { env: { LIB_MAIN = defaultLib } } = process
const m = require(LIB_MAIN)
const erotic = typeof m == 'function' ? m : m.default

if (LIB_MAIN != defaultLib) {
  console.log('using lib @ %s', LIB_MAIN) // eslint-disable-line
}

global.erotic = erotic
global.ES5 = /es5$/.test(LIB_MAIN)
