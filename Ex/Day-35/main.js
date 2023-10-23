const user = [
    {
        id: 1,
        name: "user 1"
    },
    {
        id: 2,
        name: "user 2"
    },
    {
        id: 3,
        name: "user 3"
    },
]

const getUser = userId => user.find(({id}) => userId == id)

