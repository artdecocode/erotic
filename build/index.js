Object.defineProperty(exports, "__esModule", { value: true });exports.default = erotic;var _lib = require("./lib");


var _callback = require("./callback");

/**
                                        * Call this method to get a function that will return an error with a stack
                                        * trace starting at the line in code when the call was made.
                                        */
function erotic() {
  const error = new Error();
  const caller = (0, _lib.getCallerFromArguments)(arguments);
  const entryStack = (0, _lib.getEntryStack)(error.stack);

  return (0, _callback.makeCallback)(caller, entryStack);
}