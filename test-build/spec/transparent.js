Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = require("assert");

var _build = _interopRequireDefault(require("../../build"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global ES5 */
const lib = async ({
  message,
  error
} = {}) => {
  const cb = (0, _build.default)(true);
  await new Promise((_, r) => {
    setTimeout(() => {
      let arg;

      if (message) {
        arg = message;
      } else if (error) {
        arg = error;
      } else {
        const e = new Error('test error');
        arg = e;
      }

      const er = cb(arg);
      r(er);
    }, 10);
  });
};

const T = {
  context() {
    if (ES5) throw new Error('not supported');
  },

  async 'allows to make transparent errors'() {
    try {
      await lib();
    } catch ({
      stack
    }) {
      const [, l] = stack.split('\n', 2);
      (0, _assert.ok)(/allows to make transparent errors/.test(l));
    }
  },

  async 'allows to make transparent passed message'() {
    const message = ' test message ';

    try {
      await lib({
        message
      });
    } catch ({
      stack
    }) {
      const [, l] = stack.split('\n', 2);
      (0, _assert.ok)(/allows to make transparent passed message/.test(l));
    }
  },

  async 'allows to make transparent passed error'() {
    const error = new Error(' test message ');

    try {
      await lib({
        error
      });
    } catch ({
      stack
    }) {
      const [, l] = stack.split('\n', 2);
      (0, _assert.ok)(/allows to make transparent passed error/.test(l));
    }
  }

};
var _default = T;
exports.default = _default;