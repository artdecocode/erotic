var _require = require('./lib'),
    getCallerFromArguments = _require.getCallerFromArguments,
    getCalleeStackLine = _require.getCalleeStackLine,
    getStackHeading = _require.getStackHeading;

var cleanStack = require('clean-stack');

/**
 * Create a callback
 * @function makeCallback
 * @param {function} entryCaller function which was called at entry
 * @param {string} entryStack first line of the error stack to be returned
 * @private
 */
function makeCallback(entryCaller, entryStack) {
    /**
     * This callback should be called when an asynchronous error occured.
     * @param {(string|Error)} messageOrError A message string or an Error object at
     * the point of actual error.
     * @returns {Error} An error with an updated stack which should be throw, or
     * rejected with.
     */
    function eroticCallback(messageOrError) {
        var caller = getCallerFromArguments(arguments);

        var _ref = new Error(),
            errorStack = _ref.stack;

        var calleeStackLine = getCalleeStackLine(errorStack);
        var isError = messageOrError instanceof Error;
        var message = isError ? messageOrError.message : messageOrError;

        var stackHeading = getStackHeading(message);
        var entryHasCallee = entryCaller === caller;
        var stackMessage = [stackHeading].concat(entryHasCallee ? entryStack : [calleeStackLine, entryStack]).join('\n');
        var stack = cleanStack(stackMessage);
        var properties = { message, stack };
        return Object.assign(new Error(), isError ? Object.assign({}, messageOrError, properties) : properties);
    }

    return eroticCallback;
}

module.exports = {
    makeCallback
};