const erotic = require('../')

function example() {
    const err = erotic()
    setTimeout(() => {
        throw err('some error')
    }, 10)
}

example()

