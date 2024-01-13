"use client"
import ReactFlow, {
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    SelectionMode,
    MiniMap,
    getNodesBounds,
} from "reactflow"
import { useCallback, useState } from "react";
import "reactflow/dist/style.css"

const initialNodes = [
    { id: '0', position: { x: 0, y: 0 }, data: { label: 'Mindmap Flow' } }
]
const initialEdges = []
const panOnDrag = [1, 2]

function Mindmap({ params }) {
    const { id } = params
    const [connectStartId, setConnectStartId] = useState(null)
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState(initialEdges);
    
    const onConnect = useCallback((params) => {
        console.log('onConnect', params)
        setEdges((eds) => addEdge(params, eds))
    }, [setEdges])

    const onNodesChange = useCallback((changes) => {
        setNodes((nds) => applyNodeChanges(changes, nds))
    }, [])
    const onEdgesChange = useCallback((changes) => {
        console.log('onEdgesChange', changes)
        setEdges((eds) => applyEdgeChanges(changes, eds))
    }, [])

    const onNodeDoubleClick = e => {
        console.log('onNodeDoubleClick', e)
    }

    const onConnectEnd = e => {
        console.log('onConnectEnd', e)
        const nodeId = (+nodes[nodes.length - 1].id + 1).toString()
        setNodes([...nodes, { id: nodeId, position: { x: e.layerX, y: e.layerY }, data: { label: `Node ${nodeId}` } }])
        setEdges([...edges, { id: `e${connectStartId}-${nodeId}`, source: connectStartId, target: nodeId }])
    }
    const onConnectStart = (e, params) => {
        console.log('onConnectStart', params)
        setConnectStartId(params.nodeId)
    }

    const onMoveEnd = (e, data) => {
        console.log('onMoveEnd', data)
    }

    const handleClick = e => {
        console.log('Click', e)
    }

    const bound = getNodesBounds(nodes)
    console.log(bound)

    return (
        <div className="w-full h-full" onClick={handleClick}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                panOnScroll
                defaultViewport={{ x: 400, y: 0, zoom: 1 }}
                selectionOnDrag
                panOnDrag={panOnDrag}
                selectionMode={SelectionMode.Partial}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onMoveEnd={onMoveEnd}
                onNodeDoubleClick={onNodeDoubleClick}
                onConnectEnd={onConnectEnd}
                onConnectStart={onConnectStart}
            >
                <Background variant="cross" />
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
    )
}

export default Mindmap
