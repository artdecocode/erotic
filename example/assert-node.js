const assertEqual = (actual, expected) => {
  if (actual != expected) {
    throw new Error(`${actual} != ${expected}`)
  }
}

(function test() {
  try {
    assertEqual('hello', 'world')
  } catch ({ stack }) {
    console.log(stack)
  }
})()