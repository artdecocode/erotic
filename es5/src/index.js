var _require = require('./lib'),
    getEntryStack = _require.getEntryStack,
    getCallerFromArguments = _require.getCallerFromArguments;

var _require2 = require('./callback'),
    makeCallback = _require2.makeCallback;

/**
 * Call this method to get a function that will return an error with a stack
 * trace starting at the line in code when the call was made.
 */


function erotic() {
    var error = new Error();
    var caller = getCallerFromArguments(arguments);
    var entryStack = getEntryStack(error.stack);

    return makeCallback(caller, entryStack);
}

module.exports = erotic;