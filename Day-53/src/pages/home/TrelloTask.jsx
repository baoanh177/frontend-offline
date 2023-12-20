import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { dataSlice } from "../../redux/slices/dataSlice"

const { deleteTask } = dataSlice.actions

function TrelloTask({ content, _id }) {
    const [editing, setEditing] = useState(false)
    const dispatch = useDispatch()
    const inputRef = useRef()

    const handleSubmit = e => {
        e.preventDefault()
        setEditing(false)
    }

    const handleDelete = () => {
        dispatch(deleteTask(_id))
    }

    return <>
        {editing ? 
            <textarea
                ref={inputRef}
                className={editing ? "task-box task-input active" : "task-box task-input"}
                placeholder="Nhập tiêu đề cho thẻ này"
                autoFocus
                defaultValue={content}
                onBlur={handleSubmit}
            ></textarea> :
            <div className="task-box" onDoubleClick={() => setEditing(true)}>
                <div className="content">{content}</div>
                <div className="delete">
                    <i
                        onClick={handleDelete}
                        className="fa-regular fa-trash-can"
                        style={{ color: "lightseagreen" }}
                    ></i>
                </div>
            </div>
        }
    </>
}

export default TrelloTask
