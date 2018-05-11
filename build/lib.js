Object.defineProperty(exports, "__esModule", { value: true });exports.getCallerFromArguments = exports.getStackHeading = exports.getCalleeStackLine = exports.getEntryStack = exports.getStackSegment = void 0;const getLastItem = array => {
  const item = array[array.length - 1];
  return item;
};
const getItemsFrom = (array, from) => array.slice(from);

/**
                                                          * Get a segment of the stack string, defaults are from = 0 and oneLine = false.
                                                          * @param {string} stack the stack string
                                                          * @param {number} [from=0] index from which to slice from
                                                          * @param {boolean} [oneLine=false] Whether just first line must be returned
                                                          * @returns {string} A stack segment strating from the specified line.
                                                          */
const getStackSegment = (stack, from = 0, oneLine = false) => {
  if (from === 0 && !oneLine) {
    return stack;
  }
  const splitStack = stack.
  split('\n', oneLine ? from + 1 : Number.Infinity);
  if (oneLine) {
    const line = getLastItem(splitStack);
    return line;
  } else {
    const items = getItemsFrom(splitStack, from);
    return items.join('\n');
  }
};

/**
    * Get the stack trace part of when the erotic function was called. Disregards
    * first two lines.
    * @param {string} stack error's stack
    * @returns {string} A part of stack
    * @private
    */exports.getStackSegment = getStackSegment;
const getEntryStack = stack => {
  const stackSegment = getStackSegment(stack, 2);
  return stackSegment;
};

/**
    * Get stack line of where the callback was called.
    * @param {string} stack Stack string.
    * @returns {string} Stack line.
    */exports.getEntryStack = getEntryStack;
const getCalleeStackLine = stack => {
  const calleeStackLine = getStackSegment(stack, 2, true);
  return calleeStackLine;
};exports.getCalleeStackLine = getCalleeStackLine;

const getStackHeading = message => `Error: ${message}`;

/**
                                                         * Extract caller from function's `arguments`.
                                                         * @param {object} args arguments
                                                         * @returns {function} The caller function from arguments.callee.caller.
                                                         * @private
                                                         */exports.getStackHeading = getStackHeading;
const getCallerFromArguments = args => {
  const { callee: { caller } } = args;
  return caller;
};exports.getCallerFromArguments = getCallerFromArguments;