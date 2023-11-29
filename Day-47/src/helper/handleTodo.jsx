import { client } from "../config"

const getTodos = async () => {
    const {response, data} = await client.get("/todos")
    if(!response.ok) {
        throw new Error("Can not get todo!")
    }
    return {response, data}
}

const addTodo = async (todo) => {
    const {response, data} = await client.post("/todos", todo)
    if(!response.ok) {
        throw new Error("Can not post todo!")
    }
    return {response, data}
}

const updateTodo = async (id, body) => {
    const {response, data} = await client.patch("/todos/" + id, body)
    if(!response.ok) {
        throw new Error("Can not update todo!")
    }
    return {response, data}
}

const deleteTodo = async (id) => {
    const {response, data} = await client.delete("/todos/" + id)
    if(!response.ok) {
        throw new Error("Can not delete todo!")
    }
    return {response, data}
}

export { getTodos, addTodo, updateTodo, deleteTodo }