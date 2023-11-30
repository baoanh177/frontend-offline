import { useRef, useState } from "react";
import cl from "./todo.module.scss";
import { updateTodo, deleteTodo, getTodos } from "../../helper/handleTodo";
import { toast } from "react-toastify";

function Todo({todoId, title, isCompleted, setTodos, setLoading}) {
    const [editing, setEditing] = useState(false)
    const [complete, setComplete] = useState(isCompleted)
    const [todoValue, setTodoValue] = useState(title)
    const inputRef = useRef()

    const handleChange = () => {
        setComplete(!complete)
    }

    return <div className={cl.todoItem}>
        <div className={cl.formControl}>
            <input
                ref={inputRef}
                type="text"
                required=""
                placeholder="Todo"
                className={cl.input +' '+ cl.inputAlt}
                style={{
                    textDecoration: complete ? 'line-through' : 'none'
                }}
                readOnly={!editing}
                onChange={(e) => {
                    setTodoValue(e.target.value)
                }}
                value={todoValue}
            />
            <span className={cl.inputBorder +' '+ cl.inputBorderAlt}></span>
        </div>

        <div className={cl.todoAction}>
            {editing && <div className={cl.editLayout}>
                <div className={cl.completeBox}>
                    <input type="checkbox" checked={complete} onChange={handleChange}/>
                    <span>{complete ? "Completed" : "Not Completed"}</span>
                </div>
                <button className={cl.cancelBtn} onClick={() => {
                    setEditing(false)
                    setComplete(isCompleted)
                    setTodoValue(title)
                }}>Thoát</button>
                <button
                    className={cl.updateBtn}
                    onClick={() => {
                        setLoading(true)
                        updateTodo(todoId, {
                            todo: todoValue,
                            isCompleted: complete
                        }).then(() => {
                            setLoading(false)
                            toast.success("Sửa todo thành công!")
                        })
                        setEditing(false)
                    }}
                >Update</button>
            </div>}
            {!editing && <button
                className={cl.editBtn}
                onClick={() => setEditing(true)}
            >Sửa</button>}
            <button
                className={cl.deleteBtn}
                onClick={() => {
                    setLoading(true)
                    deleteTodo(todoId).then(() => {
                        toast.success("Xóa todo thành công!")
                        getTodos().then(res => {
                            setTodos(res.data.data.listTodo)
                            setLoading(false)
                        })
                    })
                }}
            >Xóa</button>
        </div>
    </div>;
}

export default Todo;