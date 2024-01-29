"use client"
import { 
    ReactFlowProvider,
    useNodesState,
    useEdgesState
} from "reactflow"
import { createContext, useEffect, useState } from "react"

export const FlowContext = createContext()

function FlowProvider({ flow, dataId, children }) {
    const [nodes, setNodes] = useNodesState([])
    const [edges, setEdges] = useEdgesState([])
    const [flowMeta, setFlowMeta] = useState({})
    const [saveStatus, setSaveStatus] = useState("noSave")

    useEffect(() => {
        if(flow.data) {
            setNodes(flow.data.nodes)
            setEdges(flow.data.edges)
            setFlowMeta({ title: flow.title, description: flow.description })
        }
    }, [flow.data])

    return <>
        <ReactFlowProvider>
            <FlowContext.Provider 
                value={{ 
                    nodes, setNodes, 
                    edges, setEdges, 
                    flowMeta, setFlowMeta, 
                    saveStatus, setSaveStatus, 
                    dataId, 
                    flow 
                }}
            >
                { children }
            </FlowContext.Provider>
        </ReactFlowProvider>
    </>
}

export default FlowProvider;