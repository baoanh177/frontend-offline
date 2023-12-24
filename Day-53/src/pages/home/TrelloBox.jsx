import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TaskInput from "./TaskInput"
import TrelloTask from "./TrelloTask"
import { dataSlice } from "../../redux/slices/dataSlice"
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
const { deleteColumn, editColumn } = dataSlice.actions

function TrelloBox({ col }) {
    const { columnName, column } = col
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column,
        data: col
    })
    
    const dndKitBoxStyles = {
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : undefined
    }

    const [adding, setAdding] = useState(false)
    const [editing, setEditing] = useState(false)
    const editInputRef = useRef()
    const tasks = useSelector(state => state.data.tasks)
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteColumn(column))
    }

    const handleSubmit = () => {
        dispatch(editColumn({
            column,
            columnName: editInputRef.current.value != '' ? editInputRef.current.value : `Untitled`
        }))
        setEditing(false)
    }

    return (
        <div ref={setNodeRef} style={dndKitBoxStyles} {...attributes} >
            <div className="trello-box" {...listeners} >
                <div className="heading">
                    {editing ? 
                    <input
                        ref={editInputRef} type="text" className="edit-title-input"
                        defaultValue={columnName} autoFocus onBlur={handleSubmit}
                    />
                    :
                    <div className="title" onDoubleClick={() => setEditing(true)}>{columnName}</div>}

                    <div className="delete-icon" onClick={handleDelete}>
                        <i className="fa-regular fa-trash-can"></i>
                    </div>
                </div>

                <div className="tasks">
                    <SortableContext
                        items={tasks?.filter(task => task.column == column).map(c => c._id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {tasks
                            .filter(task => task.column == column)
                            .map((task, index) => task.content && <TrelloTask key={index} task={task}/>)
                        }
                        {adding && <TaskInput onAdding={setAdding} column={column} columnName={columnName} />}
                    </SortableContext>
                </div>

                <div className="foot" onClick={() => setAdding(true)}>
                    <i className="fa-solid fa-plus"></i>
                    <span>Add task</span>
                </div>
            </div>
        </div>
    )
}

export default TrelloBox
