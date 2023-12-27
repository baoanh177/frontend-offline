import { useState, useRef, memo } from "react"
import { useDispatch } from "react-redux"
import { dataSlice } from "../../../../redux/slices/dataSlice"
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const { deleteTask, editTask } = dataSlice.actions

function Task({ task }) {
    // console.log("Task render")
    const { content, key } = task
    const [editing, setEditing] = useState(false)
    const dispatch = useDispatch()
    const inputRef = useRef()

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: key,
        data: task
    })

    const dndKitTaskStyles = {
        touchAction: 'none',
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined,
        border: isDragging ? '1px solid lightseagreen' : undefined
    }

    const handleSubmit = e => {
        setEditing(false)
        if(inputRef.current.value.trim() != '') {
            dispatch(editTask({
                key,
                content: inputRef.current.value
            }))
        }else {
            handleDelete()
        }
    }

    const handleDelete = () => {
        dispatch(deleteTask(key))
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
            ></textarea>
            :
            <div className="task-box"
                ref={setNodeRef} style={dndKitTaskStyles} {...attributes} {...listeners}
            >
                <div className="content" onDoubleClick={() => setEditing(true)}>{content}</div>
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

export default memo(Task)
