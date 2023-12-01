import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
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
        if (apiKey) {
            setLoading(true)
            getTodos().then((res) => {
                setLoading(false)
                toast.success(`Chào mừng ${username} đã quay trở lại`)
                setTodos(res.data.data.listTodo)
            })
        } else {
            const email = prompt("Please enter your email:")
            handleAuth(email, setApiKey)
        }
    }, [apiKey])
    
    return (
        <>
            <div className="container">
                <ToastContainer />
                <Header setTodos={setTodos} setLoading={setLoading} />
                <div className="todos">
                    {todos.length == 0 && <div className="empty">Không có công việc</div>}
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
