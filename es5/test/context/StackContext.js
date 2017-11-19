var _require = require('./semver'),
    nodeLt = _require.nodeLt;

// simulating same process of creating an error in the erotic package


function eroticError(name, code) {
    var error = new Error(name);
    error.code = code;
    return error;
}

function getStackArray(stack) {
    return stack.split('\n');
}

function removeLineNumbers(stack) {
    var re = / \(.*\)$/gm;
    var s = stack.replace(re, '');
    return s;
}

function rejectTimeout() {
    var $args = arguments;return new Promise(function ($return, $error) {
        var t, name, code;
        t = $args.length > 0 && $args[0] !== undefined ? $args[0] : 10;
        name = $args.length > 1 && $args[1] !== undefined ? $args[1] : 'context async error';
        code = $args.length > 2 && $args[2] !== undefined ? $args[2] : 'TEST_ASYNC_ERROR';
        return Promise.resolve(new Promise(function (_, reject) {
            setTimeout(function onTimeout() {
                var asyncError = eroticError(name, code);
                reject(asyncError);
            }, t);
        })).then(function ($await_2) {
            try {
                return $return();
            } catch ($boundEx) {
                return $error($boundEx);
            }
        }.bind(this), $error);
    }.bind(this));
}

function getTimeoutError() {
    return new Promise(function ($return, $error) {
        var $Try_1_Post = function () {
            try {
                return $return();
            } catch ($boundEx) {
                return $error($boundEx);
            }
        }.bind(this);var $Try_1_Catch = function (error) {
            try {
                return $return(error);
            } catch ($boundEx) {
                return $error($boundEx);
            }
        }.bind(this);
        try {
            return Promise.resolve(rejectTimeout()).then(function ($await_3) {
                try {
                    return $Try_1_Post();
                } catch ($boundEx) {
                    return $Try_1_Catch($boundEx);
                }
            }.bind(this), $Try_1_Catch);
        } catch (error) {
            $Try_1_Catch(error)
        }
    }.bind(this));
}

function StackContext() {
    var _this = this;

    var error = eroticError('context error', 'TEST_ERROR');
    return getTimeoutError().then(function (asyncError) {
        var stack = error.stack,
            asyncStack = asyncError.stack;

        var stackArray = getStackArray(stack);
        var asyncStackArray = getStackArray(asyncStack);

        Object.assign(_this, {
            error,
            stack,
            stackArray,
            asyncError,
            asyncStack,
            asyncStackArray,
            removeLineNumbers,
            nodeLt
        });
    });
}

module.exports = StackContext;

/*
Error: context error
    at eroticError (/erotic/test/context/StackContext.js:3:19)
    at Object.StackContext (/erotic/test/context/StackContext.js:34:19)
    at Test._evaluateContext (/erotic/node_modules/zoroaster/src/test.js:85:33)
    at runTest (/erotic/node_modules/zoroaster/src/test.js:139:24)
    at Test.run (/erotic/node_modules/zoroaster/src/test.js:42:16)
    at acc.then (/erotic/node_modules/zoroaster/src/lib.js:13:30)
    at <anonymous>
Error: context async error
    at eroticError (/erotic/test/context/StackContext.js:3:19)
    at Timeout.onTimeout [as _onTimeout] (/erotic/test/context/StackContext.js:19:32)
    at ontimeout (timers.js:471:11)
    at tryOnTimeout (timers.js:306:5)
    at Timer.listOnTimeout (timers.js:266:5)
*/