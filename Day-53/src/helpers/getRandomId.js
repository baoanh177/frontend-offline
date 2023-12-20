const getRandomId = () => {
    let id = ''
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for(let i=0; i<=10; ++i) {
       const ranIndex = Math.floor(Math.random() * characters.length)
       id += characters[ranIndex]
    }
    return id
}

export { getRandomId }