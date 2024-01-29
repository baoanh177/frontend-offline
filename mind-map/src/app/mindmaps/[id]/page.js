"use client"
import ReactFlow, {
    Background,
    Controls,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    MiniMap,
    useReactFlow,
} from "reactflow"
import { useCallback, useRef, useMemo, useContext, useEffect } from "react"
import "reactflow/dist/style.css"
import EditNode from "./components/EditNode"
import { FlowContext } from "~/providers/FlowProvider"
import { updateData } from "../actions/handleUpdateData"

function Mindmap({ params }) {
    const { id: flowId } = params
    const connectingNodeId = useRef(null)
    const { nodes, setNodes, edges, setEdges, dataId, saveStatus, setSaveStatus, flowMeta } = useContext(FlowContext)
    const { screenToFlowPosition } = useReactFlow()
    const nodeTypes = useMemo(() => ({ editNode: EditNode }), [])

    useEffect(() => {
        document.onkeydown = async e => {
            if(saveStatus == "noSave") {
                if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                    e.preventDefault()
                    await updateData(dataId, flowId, flowMeta, {nodes, edges})
                    setSaveStatus("saved")
                }
            }
        }
    }, [nodes, edges])

    const getChildNodePosition = (event, parentNode) => {
        const panePosition = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        })

        return {
            x: panePosition.x - parentNode.width / 2,
            y: panePosition.y - parentNode.height / 2,
        }
    }

    const handleNodeDoubleClick = (e, activeNode) => {
        const newNodes = nodes.map(node => {
            if(node.id == activeNode.id) {
                node.type = 'editNode'
            }
            return node
        })
        setNodes(newNodes)
    }

    const onConnect = useCallback((params) => {
        setEdges((eds) => addEdge(params, eds))
    }, [setEdges, saveStatus])

    const onNodesChange = useCallback((changes) => {
        setNodes((nds) => applyNodeChanges(changes, nds))
        if(saveStatus != "noSave") {
            setSaveStatus("noSave")
        }
    }, [saveStatus])

    const onEdgesChange = useCallback((changes) => {
        setEdges((eds) => applyEdgeChanges(changes, eds))
        if(saveStatus != "noSave") {
            setSaveStatus("noSave")
        }
    }, [saveStatus])

    const onConnectStart = useCallback((e, { nodeId }) => {
        connectingNodeId.current = nodeId
    }, [nodes, edges, saveStatus])

    const onConnectEnd = useCallback((e) => {
        const targetIsPane = e.target.classList.contains("react-flow__pane")

        if (targetIsPane && connectingNodeId.current) {
            const childNodePosition = getChildNodePosition(e, nodes[0])
            const newNodeId = (+nodes[nodes.length - 1].id + 1).toString()
            setNodes([...nodes, {
                id: newNodeId,
                position: childNodePosition,
                type: "",
                data: { label: `Node ${newNodeId}` },
            }])
            setEdges([...edges, { 
                id: `f${connectingNodeId.current}-${newNodeId}`, 
                source: connectingNodeId.current, 
                target: newNodeId 
            }])
        }

    }, [nodes, edges])

    return (
        <div className="w-full h-full react-flow__pane">
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                fitView
                deleteKeyCode={'Delete'}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectEnd={onConnectEnd}
                onNodeDoubleClick={handleNodeDoubleClick}
                onConnectStart={onConnectStart}
            >
                <Background variant="dots" />
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
    )
}

export default Mindmap
