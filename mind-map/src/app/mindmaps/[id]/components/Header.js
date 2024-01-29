"use client"
import { useCallback, useContext, useEffect, useState } from "react"
import clsx from "clsx"
import { IoShareSocialOutline, IoSaveOutline, IoArrowBackCircleOutline } from "react-icons/io5"
import { updateData } from "../../actions/handleUpdateData"
import { FlowContext } from "~/providers/FlowProvider"
import { useRouter } from "next/navigation"
import Switch from "./Switch"

function Header({ flowId, flow, setShareModel }) {
    const router = useRouter()
    const [autoSave, setAutoSave] = useState(false)
    const { nodes, edges, dataId, saveStatus, setSaveStatus, flowMeta, setFlowMeta } = useContext(FlowContext)

    useEffect(() => {
        if(autoSave) {
            const timerId = setTimeout(handleSave, 2000)
            return () => {
                clearTimeout(timerId)
            }
        }
    }, [nodes, edges, flowMeta])

    useEffect(() => {
        document.title = flowMeta.title
        if(flowMeta.title?.trim() == "") {
            document.title = "Mindmap Flow"
        }
    }, [flowMeta])
    
    const handleChangeTitle = e => {
        if(saveStatus != "noSave") {
            setSaveStatus("noSave")
        }
        setFlowMeta({...flowMeta, title: e.target.value})
    }

    const handleBack = () => {
        // Xử lí save confirm model tại đây
        router.push("/mindmaps")
    }

    const handleSave = useCallback(async () => {
        if(saveStatus != "saved") {
            setSaveStatus("saving")
            await updateData(dataId, flowId, flowMeta, { nodes, edges })
            setSaveStatus("saved")
        }
    }, [saveStatus, nodes, edges, flowMeta])


    return <>
        <header className="flex bg-transparent fixed top-0 left-0 right-0 px-5 py-2 z-20 gap-3">
            <button 
                onClick={handleBack}
                className="
                    h-10 w-10 bg-white flex items-center justify-center rounded-sm shadow-sm 
                    shadow-gray-400 hover:bg-gray-50 transition cursor-pointer
                "
            >
                <IoArrowBackCircleOutline className="text-2xl"/>
            </button>
            <div className="flex gap-3 items-center h-10 bg-white px-4 py-1 rounded-sm shadow-sm shadow-gray-400">
                <h2 className="text-xl font-semibold text-green-600 select-none">Flow</h2>
                <input 
                    type="text" 
                    defaultValue={flow.title}
                    spellCheck={false}
                    className="border-x-2 px-2 outline-none border-gray-400"
                    onChange={handleChangeTitle}
                />
                <div className="flex items-center gap-1">
                    <span className="text-xs">AutoSave</span> 
                    <Switch setAutoSave={setAutoSave}/>
                </div>
                {saveStatus != "saving" ?
                    <button 
                        className={clsx("px-4 py-1 w-24 rounded-md flex items-center gap-1 justify-center", 
                            saveStatus == "saved" ? "bg-green-900 text-gray-200" : "bg-green-600 text-white")}
                        onClick={handleSave}
                    >
                        <IoSaveOutline />
                        <span>{saveStatus == "saved" ? "Saved" : "Save"}</span>
                    </button>
                    : 
                    <button className="px-4 py-1 w-24 rounded-md bg-green-900 text-gray-200 gap-1 flex items-center">
                        <div className="w-3 h-3 rounded-full animate-spin border-2 border-solid border-gray-200 border-t-transparent"></div>
                        <span>Saving</span>
                    </button>
                }
                <button 
                    onClick={() => setShareModel(true)}
                    className="px-4 py-1 rounded-md bg-blue-600 text-white flex items-center justify-center gap-1"
                >
                    <IoShareSocialOutline />
                    <span>Share</span>
                </button>
            </div>
        </header>
    </>
}

export default Header