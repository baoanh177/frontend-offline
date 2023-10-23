class User {
    #email = "123@gmail.com"
    constructor() {
        this.data = ["User 1", "User 2", "User 3"]
    }

    get latest() {
        return this.data[this.data.length - 1]
    }

    get email() {
        return this.#email
    }

    set email(value) {
        this.#email = value
    }
}

const user = new User()

console.log(user.latest)
console.log(user.email)