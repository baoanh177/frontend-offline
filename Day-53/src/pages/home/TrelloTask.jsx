import { useState, useRef, memo } from "react"
import { useDispatch } from "react-redux"
import { dataSlice } from "../../redux/slices/dataSlice"
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const { deleteTask, editTask } = dataSlice.actions

function TrelloTask({ task }) {
    const { content, _id } = task
    const [editing, setEditing] = useState(false)
    const dispatch = useDispatch()
    const inputRef = useRef()

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: _id, data: task })
    
    const dndKitTaskStyles = {
        transform: CSS.Translate.toString(transform),
        transition,
    }

    const handleSubmit = e => {
        if(inputRef.current.value.trim() != '') {
            dispatch(editTask({
                id: _id,
                content: inputRef.current.value
            }))
        }else {
            handleDelete()
        }
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
            <div className="task-box" onDoubleClick={() => setEditing(true)}
                ref={setNodeRef} style={dndKitTaskStyles} {...attributes} {...listeners}
            >
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

export default memo(TrelloTask)
