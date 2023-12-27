import { useRef } from "react"
import { useDispatch } from "react-redux"
import { dataSlice } from "../../../../redux/slices/dataSlice"
import { getRandomId } from "../../../../helpers/getRandomId"
const { addTask } = dataSlice.actions

function TaskInput({ onAdding, column }) {
    const inputRef = useRef()
    const dispatch = useDispatch()

    const handleSubmit = () => {
        const value = inputRef.current.value.trim()
        if(value != '') {
            dispatch(addTask({column, content: value, key: getRandomId()}))
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
