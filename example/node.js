function example() {
    setTimeout(() => {
        throw new Error('some error')
    }, 10)
}

example()
