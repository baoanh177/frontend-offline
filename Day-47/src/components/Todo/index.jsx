import { useRef, useState } from "react";
import cl from "./todo.module.scss";
import { updateTodo, deleteTodo, getTodos } from "../../helper/handleTodo";

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
                <button className={cl.cancelBtn} onClick={() => setEditing(false)}>Thoát</button>
                <button
                    className={cl.updateBtn}
                    onClick={() => {
                        updateTodo(todoId, {
                            todo: todoValue,
                            isCompleted: complete
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
                    getTodos().then(res => {
                        setTodos(res.data.data.listTodo)
                        setLoading(false)
                    })
                })}}
            >Xóa</button>
        </div>
    </div>;
}

export default Todo;