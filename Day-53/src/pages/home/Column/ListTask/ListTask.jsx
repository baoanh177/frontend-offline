import { memo, useState } from "react"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSelector } from "react-redux"
import TaskInput from "./TaskInput"
import Task from "./Task"

function ListTask({ column }) {
    const [adding, setAdding] = useState(false)
    const tasks = useSelector(state => state.data.tasks)

    return <>
        <div className="tasks">
            <SortableContext
                items={tasks?.filter(task => task?.column == column).map(c => c.key)}
                strategy={verticalListSortingStrategy}
            >
                {tasks
                    .filter(task => task.column == column)
                    .map((task, index) => task.content && <Task key={task.key} task={task}/>)
                }
            </SortableContext>
            {adding && <TaskInput onAdding={setAdding} column={column} />}

            <div className="foot" onClick={() => setAdding(true)}>
                <i className="fa-solid fa-plus"></i>
                <span>Add task</span>
            </div>
        </div>
    </>
}

export default memo(ListTask)