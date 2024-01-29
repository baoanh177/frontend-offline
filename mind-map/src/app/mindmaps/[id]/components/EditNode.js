import { useContext, useRef } from "react"
import { Handle, Position, useNodes } from "reactflow"
import { FlowContext } from "~/providers/FlowProvider"

function EditNode({ id, data }) {
    const nodes = useNodes()
    const inputRef = useRef()
    const { setNodes } = useContext(FlowContext)

    const handleSubmit = () => {
        if(inputRef.current.value.trim() !== '') {
            const newNodes = nodes.map(node => {
                if(node.id == id) {
                    node.data.label = inputRef.current.value
                    node.type = ''
                }
                return node
            })
            setNodes(newNodes)
        }
    }

    const handleKeyDown = e => {
        if(e.key == 'Enter') {
            handleSubmit()
        }
    }

    return (
        <>
            <Handle type="target" position={Position.Top} />
            <div className="border-[1px] p-0 border-green-600 w-[150px] h-[40px] flex items-center bg-white rounded-sm overflow-hidden">
                <input
                    ref={inputRef}
                    onBlur={handleSubmit}
                    onKeyDown={handleKeyDown}
                    id="text"
                    name="text"
                    autoComplete="off"
                    autoFocus
                    spellCheck={false}
                    className="w-full h-full outline-none text-xs text-center"
                    defaultValue={data.label}
                />
            </div>
            <Handle type="source" position={Position.Bottom} id="a" />
        </>
    )
}

export default EditNode