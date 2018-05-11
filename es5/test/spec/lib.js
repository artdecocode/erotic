var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break } } catch (err) { _d = true; _e = err } finally { try { if (!_n && _i['return']) _i['return']() } finally { if (_d) throw _e } } return _arr } return function (arr, i) { if (Array.isArray(arr)) { return arr } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i) } else { throw new TypeError('Invalid attempt to destructure non-iterable instance') } } }()

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr) }

var _require = require('../../src/lib'),
  getStackSegment = _require.getStackSegment,
  getEntryStack = _require.getEntryStack,
  getCalleeStackLine = _require.getCalleeStackLine,
  getStackHeading = _require.getStackHeading,
  getCallerFromArguments = _require.getCallerFromArguments

var assert = require('assert')
var deepEqual = assert.deepEqual,
  equal = assert.equal

var context = require('../context/StackContext')

var libTestSuite = {
  context,
  getStackSegment: {
    'returns all lines by default'(_ref) {
      var stack = _ref.stack

      var res = getStackSegment(stack)
      deepEqual(res, stack)
    },
    'returns only the first line'(_ref2) {
      var stack = _ref2.stack,
        stackArray = _ref2.stackArray

      var res = getStackSegment(stack, 0, true)

      var _stackArray = _slicedToArray(stackArray, 1),
        expected = _stackArray[0]

      equal(res, expected)
    },
    'returns only the second line'(_ref3) {
      var stack = _ref3.stack,
        stackArray = _ref3.stackArray

      var res = getStackSegment(stack, 1, true)

      var _stackArray2 = _slicedToArray(stackArray, 2),
        expected = _stackArray2[1]

      equal(res, expected)
    },
    'returns first to last lines'(_ref4) {
      var stack = _ref4.stack,
        stackArray = _ref4.stackArray

      var res = getStackSegment(stack, 1)

      var _stackArray3 = _toArray(stackArray),
        e = _stackArray3.slice(1)

      var expected = e.join('\n')
      deepEqual(res, expected)
    },
    'returns second to last lines'(_ref5) {
      var stack = _ref5.stack,
        stackArray = _ref5.stackArray

      var res = getStackSegment(stack, 2)

      var _stackArray4 = _toArray(stackArray),
        e = _stackArray4.slice(2)

      var expected = e.join('\n')
      deepEqual(res, expected)
    },
  },
  getEntryStack: {
    'returns the entry stack'(_ref6) {
      var stack = _ref6.stack,
        stackArray = _ref6.stackArray

      var res = getEntryStack(stack)

      var _stackArray5 = _toArray(stackArray),
        e = _stackArray5.slice(2)

      var expected = e.join('\n')
      equal(res, expected)
    },
  },
  getCalleeStackLine: {
    'returns line of stack where it was called'(_ref7) {
      var stack = _ref7.stack

      var res = getCalleeStackLine(stack)
      assert(/at Object.StackContext/.test(res))
    },
  },
  getStackHeading: {
    'returns a new error heading'() {
      var res = getStackHeading('test-error')
      equal(res, 'Error: test-error')
    },
  },
  getCallerFromArguments: {
    'returns caller function from arguments'() {
      var caller = function caller() {
        function test() {
          return getCallerFromArguments(arguments)
        }
        return test()
      }
      var res = caller()
      equal(res, caller)
    },
  },
}

module.exports = libTestSuite