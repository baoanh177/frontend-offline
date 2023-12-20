import { useState } from "react"
import { useSelector } from "react-redux"
import TaskInput from "./TaskInput"
import TrelloTask from "./TrelloTask"

function TrelloBox({ columnName, column }) {
    const [adding, setAdding] = useState(false)
    const tasks = useSelector(state => state.data.tasks)

    return (
        <div className="trello-box">
            <div className="heading">
                <div className="title">{columnName}</div>
                <div className="delete-icon">
                <i className="fa-regular fa-trash-can" style={{color: "#fff"}}></i>
                </div>
            </div>

            <div className="tasks">
                {tasks.filter(task => task.column == column).map((task, index) => <TrelloTask key={index} {...task}/>)}
                {adding && <TaskInput onAdding={setAdding} column={column} columnName={columnName} />}
            </div>

            <div className="foot" onClick={() => setAdding(true)}>
                <i className="fa-solid fa-plus"></i>
                <span>Add task</span>
            </div>
        </div>
    )
}

export default TrelloBox
