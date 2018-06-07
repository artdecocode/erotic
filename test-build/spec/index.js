Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = require("assert");

var _context = _interopRequireDefault(require("../context"));

var _build = _interopRequireDefault(require("../../build"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: _context.default,

  'is a function'() {
    (0, _assert.equal)(typeof _build.default, 'function');
  },

  'calls package without error'() {
    (0, _assert.doesNotThrow)(() => {
      (0, _build.default)();
    });
  },

  async 'returns error stack'({
    removeLineNumbers,
    nodeLt
  }) {
    const e = (0, _build.default)();
    const message = 'error-message';

    try {
      await new Promise((_, reject) => {
        setTimeout(function () {
          const eroticError = e(message);
          reject(eroticError);
        }, 1);
      });
    } catch ({
      stack
    }) {
      const s = removeLineNumbers(stack); // Timeout constructor name from 5.9.1
      // https://github.com/nodejs/node/pull/5793

      const nl = nodeLt('v5.9.1');
      const expected = `Error: ${message}
    at ${nl ? 'null' : 'Timeout'}._onTimeout
    at returns error stack`;
      (0, _assert.ok)(s.startsWith(expected));
    }
  },

  'returns error stack with sync function'({
    removeLineNumbers
  }) {
    const makeError = (0, _build.default)();
    const message = 'error-message';
    const eroticError = makeError(message);

    try {
      throw eroticError;
    } catch ({
      stack
    }) {
      const s = removeLineNumbers(stack);
      const expected = `Error: ${message}
    at returns error stack with sync function`;
      (0, _assert.ok)(s.startsWith(expected));
    }
  },

  async 'extends passed error object'() {
    const er = (0, _build.default)();
    const message = 'error-message';
    const code = 'TEST_ERROR';

    try {
      await new Promise((_, r) => {
        setTimeout(() => {
          const err = new Error(message);
          err.code = code;
          const e = er(err);
          r(e);
        }, 1);
      });
    } catch (error) {
      (0, _assert.ok)(error instanceof Error);
      (0, _assert.equal)(error.message, message);
      (0, _assert.equal)(error.code, code);
    }
  }

};
var _default = T;
exports.default = _default;