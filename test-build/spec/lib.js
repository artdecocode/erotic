Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = require("assert");

var _lib = require("../../build/lib");

var _context = _interopRequireDefault(require("../context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: _context.default,
  getStackSegment: {
    'returns all lines by default'({
      stack
    }) {
      const res = (0, _lib.getStackSegment)(stack);
      (0, _assert.deepEqual)(res, stack);
    },

    'returns only the first line'({
      stack,
      stackArray
    }) {
      const res = (0, _lib.getStackSegment)(stack, 0, true);
      const [expected] = stackArray;
      (0, _assert.equal)(res, expected);
    },

    'returns only the second line'({
      stack,
      stackArray
    }) {
      const res = (0, _lib.getStackSegment)(stack, 1, true);
      const [, expected] = stackArray;
      (0, _assert.equal)(res, expected);
    },

    'returns first to last lines'({
      stack,
      stackArray
    }) {
      const res = (0, _lib.getStackSegment)(stack, 1);
      const [, ...e] = stackArray;
      const expected = e.join('\n');
      (0, _assert.deepEqual)(res, expected);
    },

    'returns second to last lines'({
      stack,
      stackArray
    }) {
      const res = (0, _lib.getStackSegment)(stack, 2);
      const [,, ...e] = stackArray;
      const expected = e.join('\n');
      (0, _assert.deepEqual)(res, expected);
    }

  },
  getEntryStack: {
    'returns the entry stack'({
      stack,
      stackArray
    }) {
      const res = (0, _lib.getEntryStack)(stack);
      const [,, ...e] = stackArray;
      const expected = e.join('\n');
      (0, _assert.equal)(res, expected);
    }

  },
  getCalleeStackLine: {
    'returns line of stack where it was called'({
      stack
    }) {
      const res = (0, _lib.getCalleeStackLine)(stack);
      (0, _assert.ok)(/at Context._init/.test(res));
    }

  },
  getStackHeading: {
    'returns a new error heading'() {
      const res = (0, _lib.getStackHeading)('test-error');
      (0, _assert.equal)(res, 'Error: test-error');
    }

  },
  getCallerFromArguments: {
    'returns caller function from arguments'() {
      const caller = () => {
        function test() {
          return (0, _lib.getCallerFromArguments)(arguments);
        }

        return test();
      };

      const res = caller();
      (0, _assert.equal)(res, caller);
    }

  }
};
var _default = T;
exports.default = _default;