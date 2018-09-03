import erotic from '../src'

const assertEqual = (actual, expected) => {
  const e = erotic(true)
  if (actual != expected) {
    const er = e(`${actual} != ${expected}`)
    throw er
  }
}

(function test() {
  try {
    assertEqual('hello', 'world')
  } catch ({ stack }) {
    console.log(stack)
  }
})()