Object.defineProperty(exports, "__esModule", { value: true });exports.makeCallback = makeCallback;var _cleanStack = _interopRequireDefault(require("clean-stack"));
var _lib = require("./lib");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



/**
                                                                                                                           * Create a callback
                                                                                                                           * @function makeCallback
                                                                                                                           * @param {function} entryCaller function which was called at entry
                                                                                                                           * @param {string} entryStack first line of the error stack to be returned
                                                                                                                           * @param {boolean} [shadow=false] print only entry stack
                                                                                                                           * @private
                                                                                                                           */
function makeCallback(entryCaller, entryStack, shadow = false) {
  /**
                                                                 * This callback should be called when an asynchronous error occurred.
                                                                 * @param {(string|Error)} messageOrError A message string or an Error object at
                                                                 * the point of actual error.
                                                                 * @returns {Error} An error with an updated stack which should be throw, or
                                                                 * rejected with.
                                                                 */
  function cb(messageOrError) {
    const caller = (0, _lib.getCallerFromArguments)(arguments);
    const { stack: errorStack } = new Error();
    const calleeStackLine = (0, _lib.getCalleeStackLine)(errorStack);
    const isError = messageOrError instanceof Error;
    const message = isError ? messageOrError.message : messageOrError;

    const stackHeading = (0, _lib.getStackHeading)(message);
    const entryHasCallee = entryCaller === caller;
    const stackMessage = [
    stackHeading,
    ...(entryHasCallee || shadow ? [entryStack] : [
    calleeStackLine,
    entryStack])].

    join('\n');

    const stack = (0, _cleanStack.default)(stackMessage);
    const properties = { message, stack };

    return Object.assign(isError ? messageOrError : new Error(), properties);
  }

  return cb;
}
//# sourceMappingURL=callback.js.map