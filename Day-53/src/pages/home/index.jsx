import { useDispatch, useSelector } from "react-redux"
import TrelloBox from "./TrelloBox"
import AddColForm from "./AddColForm"
import "./Home.css"
import { useEffect } from "react"
import { getData } from "../../redux/slices/dataSlice"

function Home() {
    const cols = useSelector(state => state.data.cols)
    const tasks = useSelector(state => state.data.tasks)

    console.log({cols, tasks})
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getData())
    }, [dispatch])

    useEffect(() => {
        localStorage.setItem('columns', JSON.stringify(cols))
    }, [cols])

    return (
        <div className="container">
            {cols.map((col, index) => <TrelloBox key={index} {...col}/>)}
            <AddColForm />
        </div>
    )
}

export default Home
