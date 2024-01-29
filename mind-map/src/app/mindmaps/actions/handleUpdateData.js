"use client"
// import { revalidateTag } from "next/cache"
import { getData } from "./handleGetData"
import { postFlow } from "./handlePostFlow"

export const updateData = async (dataId, flowId, flowMeta, newFlowData) => {
    const { data: prevData } = await getData(dataId)
    const updatedFlows = prevData.flows.map((flow, index) => {
        if(flow.id == flowId) {
            return {
                ...prevData.flows[index],
                title: flowMeta.title,
                description: flowMeta.description,
                data: newFlowData
            }
        }
        return flow
    })
    await postFlow({ id: dataId, flows: updatedFlows})
    // revalidateTag("flows")
}