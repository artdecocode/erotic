var getLastItem = function getLastItem(array) {
    var item = array[array.length - 1];
    return item;
};
var getItemsFrom = function getItemsFrom(array, from) {
    return array.slice(from);
};

/**
 * Get a segment of the stack string, defaults are from = 0 and oneLine = false.
 * @param {string} stack the stack string
 * @param {number} [from=0] index from which to slice from
 * @param {boolean} [oneLine=false] Whether just first line must be returned
 * @returns {string} A stack segment strating from the specified line.
 */
var getStackSegment = function getStackSegment(stack) {
    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var oneLine = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (from === 0 && !oneLine) {
        return stack;
    }
    var splitStack = stack.split('\n', oneLine ? from + 1 : Number.Infinity);
    if (oneLine) {
        var line = getLastItem(splitStack);
        return line;
    } else {
        var items = getItemsFrom(splitStack, from);
        return items.join('\n');
    }
};

/**
 * Get the stack trace part of when the erotic function was called. Disregards
 * first two lines.
 * @param {string} stack error's stack
 * @returns {string} A part of stack
 * @private
 */
var getEntryStack = function getEntryStack(stack) {
    var stackSegment = getStackSegment(stack, 2);
    return stackSegment;
};

/**
 * Get stack line of where the callback was called.
 * @param {string} stack Stack string.
 * @returns {string} Stack line.
 */
var getCalleeStackLine = function getCalleeStackLine(stack) {
    var calleeStackLine = getStackSegment(stack, 2, true);
    return calleeStackLine;
};

var getStackHeading = function getStackHeading(message) {
    return `Error: ${message}`;
};

/**
 * Extract caller from function's `arguments`.
 * @param {object} args arguments
 * @returns {function} The caller function from arguments.callee.caller.
 * @private
 */
var getCallerFromArguments = function getCallerFromArguments(args) {
    var caller = args.callee.caller;

    return caller;
};

module.exports = {
    getStackSegment,
    getCalleeStackLine,
    getEntryStack,
    getStackHeading,
    getCallerFromArguments
};