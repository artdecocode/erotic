Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = erotic;

var _lib = require("./lib");

var _callback = require("./callback");

/**
 * Call this method to get a function that will return an error with a stack
 * trace starting at the line in code when the call was made.
 * @param {boolean} [transparent] Pretend as if the call to the function lead to the error, without exposing any of the internal stack.
 */
function erotic(transparent) {
  const {
    stack
  } = new Error();
  const caller = (0, _lib.getCallerFromArguments)(arguments);
  const entryStack = (0, _lib.getEntryStack)(stack, transparent);
  return (0, _callback.makeCallback)(caller, entryStack, transparent);
}
//# sourceMappingURL=index.js.map