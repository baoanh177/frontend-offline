import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { dataSlice } from "../../redux/slices/dataSlice"
const { addTask } = dataSlice.actions

function TaskInput({ onAdding, column, columnName }) {
    const inputRef = useRef()
    const dispatch = useDispatch()

    const handleSubmit = () => {
        const value = inputRef.current.value.trim()
        if(value != '') {
            dispatch(addTask([{content: value, columnName: columnName, column: column }]))
        }
        onAdding(false)
    }

    return (
        <textarea
            ref={inputRef}
            className="task-box task-input"
            placeholder="Nhập tiêu đề cho thẻ này"
            autoFocus
            onBlur={handleSubmit}
        ></textarea>
    )
}

export default TaskInput
