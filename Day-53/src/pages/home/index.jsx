import { useDispatch, useSelector } from "react-redux"
import TrelloBox from "./TrelloBox"
import TrelloTask from "./TrelloTask"
import AddColForm from "./AddColForm"
import "./Home.css"
import { useEffect, useState } from "react"
import { getData } from "../../redux/middlewares/dataMiddleware"
import { dataSlice } from "../../redux/slices/dataSlice"
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects } from "@dnd-kit/core"
import { arrayMove } from '@dnd-kit/sortable';
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable"

const { orderColumn } = dataSlice.actions

const ACTIVE_DRAG_TYPE = {
    BOX: "ACTIVE_DRAG_TYPE_BOX",
    TASK: "ACTIVE_DRAG_TYPE_TASK",
}

function Home() {
    const cols = useSelector(state => state.data.cols)
    const dispatch = useDispatch()

    // hold 250ms - Dung sai cảm ứng 5px
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    const sensors = useSensors(mouseSensor, touchSensor)

    const [activeDrag, setActiveDrag] = useState({})

    useEffect(() => {
        dispatch(getData())
    }, [dispatch])

    const handleDragStart = event => {
        // console.log('handleDragStart ', event)
        setActiveDrag({
            activeId: event?.active?.id,
            activeType: event?.active?.data?.current?.columnName ? 
                        ACTIVE_DRAG_TYPE.BOX : 
                        ACTIVE_DRAG_TYPE.TASK,
            activeData: event?.active?.data?.current
        })
    }

    const handleDragEnd = event => {
        // console.log('handleDragEnd', event)
        const { active, over } = event

        if(!over) {
            return
        }

        if(active.id !== over.id) {
            const oldIndex = cols.findIndex(col => col.column == active.id)
            const newIndex = cols.findIndex(col => col.column == over.id)

            const orderedCols = arrayMove(cols, oldIndex, newIndex)
            dispatch(orderColumn(orderedCols))
        }
        setActiveDrag({})
    }

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5'
                }
            }
        })
    }


    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
            <div className="container">
                <SortableContext items={cols?.map(c => c.column)} strategy={horizontalListSortingStrategy}>
                    {cols.map((col, index) => <TrelloBox key={col.column} col={col}/>)}
                </SortableContext>
                <AddColForm />
            </div>
        </DndContext>
    )
}

export default Home
