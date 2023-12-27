import { memo } from "react"
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import ListTask from "./ListTask/ListTask"
import ColumnTitle from "./ColumnTitle";

function Column({col}) {
    // console.log('box render')
    
    const { columnName, column } = col
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column,
        data: {...col}
    })
    
    const dndKitBoxStyles = {
        touchAction: 'none',
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : undefined,
    }

    return (
        <div ref={setNodeRef} style={dndKitBoxStyles} {...attributes} >
            <div className="trello-box" {...listeners} >
                <ColumnTitle columnName={columnName} column={column} />

                <ListTask column={column} />
            </div>
        </div>
    )
}

export default memo(Column)
