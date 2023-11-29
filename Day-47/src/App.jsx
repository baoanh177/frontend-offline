import { useEffect, useState } from "react"
import { handleAuth } from "./helper/handleAuth"
import { client } from "./config"
import { getTodos } from "./helper/handleTodo"
import Header from "./components/Header"
import Todo from "./components/Todo"
import Loading from "./components/Loading"
import "./index.css"

function App() {
    console.log("re-render")
    const key = JSON.parse(localStorage.getItem("apiKey"))
    const username = JSON.parse(localStorage.getItem("username"))
    const [apiKey, setApiKey] = useState(key)
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        client.setApiKey(apiKey)
    }, [apiKey])

    useEffect(() => {
        setLoading(true)
        getTodos().then((res) => {
            setLoading(false)
            setTodos(res.data.data.listTodo)
        })
    }, [])

    if (apiKey) {
        console.log(
            `%cChào mừng ${username} đã quay trở lại`,
            "font-size: 20px; color: green; font-weight: bold"
        )
    } else {
        const email = prompt("Please enter your email:")
        handleAuth(email)
    }

    return (
        <>
            <div className="container">
                <Header setTodos={setTodos} setLoading={setLoading} />
                <div className="list-todo">
                    {todos.map((todo) => {
                        return (
                            <Todo
                                key={todo._id}
                                todoId={todo._id}
                                title={todo.todo}
                                isCompleted={todo.isCompleted}
                                setTodos={setTodos}
                                setLoading={setLoading}
                            />
                        )
                    })}
                </div>
            </div>
            {loading && <Loading />}
        </>
    )
}

export default App
