const { resolve } = require('path')

require('@babel/register')

const p = resolve(__dirname, '..', process.argv[2])
require(p)
