const assert = require('assert')
const myNewPackage = require('../../src/')

const myNewPackageTestSuite = {
    'should be a function': () => {
        assert.equal(typeof myNewPackage, 'function')
    },
    'should call package without error': () => {
        assert.doesNotThrow(() => {
            myNewPackage()
        })
    },
}

module.exports = myNewPackageTestSuite
