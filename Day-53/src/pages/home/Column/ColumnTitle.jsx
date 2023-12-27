import { useState, useRef, memo } from "react";
import { useDispatch } from "react-redux"
import { dataSlice } from "../../../redux/slices/dataSlice"
const { deleteColumn, editColumn } = dataSlice.actions

function ColumnTitle({ columnName, column }) {
    const [editing, setEditing] = useState(false)
    const editInputRef = useRef()
    const dispatch = useDispatch()

    const handleSubmit = () => {
        console.log('handleSubmit')
        dispatch(editColumn({
            column,
            columnName: editInputRef.current.value != '' ? editInputRef.current.value : `Untitled`
        }))
        setEditing(false)
    }

    const handleDelete = () => {
        console.log('handleDelete')
        dispatch(deleteColumn(column))
    }

    return <>
        <div className="heading">
            {editing ? 
            <form action="" onSubmit={handleSubmit}>
                <input
                    ref={editInputRef} type="text" className="edit-title-input"
                    defaultValue={columnName} autoFocus onBlur={handleSubmit}
                />
            </form>
            :
            <div className="title" onDoubleClick={() => setEditing(true)}>{columnName}</div>}

            <div className="delete-icon" onClick={handleDelete}>
                <i className="fa-regular fa-trash-can"></i>
            </div>
        </div>
    </>
}

export default memo(ColumnTitle);