var assert = require('assert');
var context = require('../context/StackContext');
var erotic = require('../../src/');
var doesNotThrow = assert.doesNotThrow,
    equal = assert.equal;


var eroticTestSuite = {
    context,
    'should be a function'() {
        equal(typeof erotic, 'function');
    },
    'should call package without error'() {
        doesNotThrow(function doesNotThrow() {
            erotic();
        });
    },
    'should return error stack'(_ref) {
        var removeLineNumbers = _ref.removeLineNumbers,
            nodeLt = _ref.nodeLt;

        var e = erotic();
        var message = 'error-message';
        return new Promise(function (_, reject) {
            setTimeout(function () {
                var eroticError = e(message);
                reject(eroticError);
            }, 1);
        }).catch(function (_ref2) {
            var stack = _ref2.stack;

            var s = removeLineNumbers(stack);
            // Timeout constructor name from 5.9.1
            // https://github.com/nodejs/node/pull/5793
            var expected = `Error: ${message}
    at ${nodeLt('v5.9.1') ? 'null' : 'Timeout'}._onTimeout
    at should return error stack`;
            assert(s.startsWith(expected));
        });
    },
    'should return error stack with sync function'(_ref3) {
        var removeLineNumbers = _ref3.removeLineNumbers;

        var makeError = erotic();
        var message = 'error-message';
        var eroticError = makeError(message);
        try {
            throw eroticError;
        } catch (_ref4) {
            var stack = _ref4.stack;

            var s = removeLineNumbers(stack);
            var expected = `Error: ${message}
    at should return error stack with sync function`;
            assert(s.startsWith(expected));
        }
    },
    'should extend passed error object'() {
        return new Promise(function ($return, $error) {
            var er, message, code;

            er = erotic();
            message = 'error-message';
            code = 'TEST_ERROR';
            var $Try_2_Post = function () {
                try {
                    return $return();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this);var $Try_2_Catch = function (error) {
                try {
                    assert(error instanceof Error);
                    equal(error.message, message);
                    equal(error.code, code);
                    return $Try_2_Post();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this);try {
                return Promise.resolve(new Promise(function (_, reject) {
                    setTimeout(function () {
                        var err = new Error(message);
                        err.code = code;
                        var eroticError = er(err);
                        reject(eroticError);
                    }, 1);
                })).then(function ($await_3) {
                    try {
                        return $Try_2_Post();
                    } catch ($boundEx) {
                        return $Try_2_Catch($boundEx);
                    }
                }.bind(this), $Try_2_Catch);
            } catch (error) {
                $Try_2_Catch(error)
            }
        }.bind(this));
    }
};

module.exports = eroticTestSuite;