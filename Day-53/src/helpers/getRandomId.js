const getRandomId = () => {
    let id = ''
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrs_-tuvwxyz0123456789"
    for(let i=0; i<=20; ++i) {
       const ranIndex = Math.floor(Math.random() * characters.length)
       id += characters[ranIndex]
    }
    return id
}

export { getRandomId }