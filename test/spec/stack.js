// import { throws, equal, ok } from 'zoroaster/assert'
// import { hideStack, hideStackAsync } from '../../src/hide'
// import Context from '../context'

// /** @type {Object.<string, (c: Context)>} */
// const T = {
//   context: Context,
//   async 'hides error stack'() {
//     const t = () => {
//       const err = new Error('test-error')
//       throw err
//     }
//     const testThrows = () => {
//       t()
//     }
//     await throws({
//       fn: hideStack,
//       args: testThrows,
//       stack(stack) {
//         const lines = stack.split('\n')
//         equal(lines.length, 3)
//         const [heading, line, line2] = lines
//         equal(heading, 'Error: test-error')
//         ok(/at t /.test(line))
//         ok(/at testThrows /.test(line2))
//       },
//     })
//   },
//   async 'hides error stack (async)'() {
//     const testThrows = async () => {
//       await new Promise(r => setTimeout(r, 10))
//       const err = new Error('test-error')
//       throw err
//     }
//     await throws({
//       fn: hideStackAsync,
//       args: testThrows,
//       stack(stack) {
//         const lines = stack.split('\n')
//         equal(lines.length, 3)
//         const [heading, line, line2] = lines
//         equal(heading, 'Error: test-error')
//         ok(/at testThrows /.test(line))
//         ok(/at <anonymous>/.test(line2))
//       },
//     })
//   },
// }

// export default T
