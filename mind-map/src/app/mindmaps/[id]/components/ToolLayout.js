"use client"
import { useState } from "react"
import Header from "./Header";
import ShareModel from "./ShareModel"

function ToolLayout({ children, id, flow, userData, dataId, flows }) {
    const [shareModel, setShareModel] = useState(false)

    return <>
        <Header flowId={id} flow={flow} setShareModel={setShareModel}/>
        {shareModel && <ShareModel setShareModel={setShareModel} userData={userData} flows={flows} flow={flow} dataId={dataId} />}
        {children}
    </>
}

export default ToolLayout;