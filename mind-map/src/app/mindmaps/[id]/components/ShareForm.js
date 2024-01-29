"use client"
import { useContext, useRef } from "react"
import { MdOutlineContentCopy } from "react-icons/md"
import { FlowContext } from "~/providers/FlowProvider"
import { postFlow } from "../../actions/handlePostFlow"

function ShareForm({ loading, setLoading, userData, flow, flows }) {
    const { flowMeta } = useContext(FlowContext)
    const linkInputRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!loading) {
            setLoading(true)
            const formData = Object.fromEntries([...new FormData(e.target)])
            flow.share_data = formData
            flow.isPublic = true
            const newFlows = flows.map(f => {
                if(f.id == flow.id) {
                    f = flow
                }
                return f
            })
            const newData = {
                ...userData,
                flows: newFlows
            }
            await postFlow(newData)
            setLoading(false)
        }
    }

    return (
        <>
            <form action="" id="share_form" onSubmit={handleSubmit}>
                <div className="mt-2">
                    <span className="text-gray-600">Shared link</span>
                    <div className="border w-full h-9 rounded-md overflow-hidden border-black relative">
                        <input
                            ref={linkInputRef}
                            type="text"
                            name="shared_link"
                            defaultValue={window.location.href}
                            readOnly
                            className="w-full h-full py-1 px-3 pr-7 outline-none"
                        />
                        <MdOutlineContentCopy 
                            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" 
                            onClick={() => navigator.clipboard.writeText(linkInputRef.current.value)}
                        />
                    </div>
                </div>
                <div className="mt-2">
                    <span className="text-gray-600">Title</span>
                    <div className="border w-full h-9 rounded-md overflow-hidden border-black relative">
                        <input
                            type="text"
                            name="title"
                            defaultValue={flow.share_data?.title ?? flowMeta.title}
                            className="w-full h-full py-1 px-3 outline-none"
                            placeholder="Title"
                        />
                    </div>
                </div>
                <div className="mt-2">
                    <span className="text-gray-600">Description</span>
                    <div className="border w-full rounded-md overflow-hidden border-black relative">
                        <textarea
                            cols="30"
                            rows="3"
                            name="description"
                            className="w-full h-full outline-none px-3 py-1"
                            placeholder="Description"
                            defaultValue={flow.share_data?.description ?? flowMeta.description ?? "Không có mô tả"}
                        ></textarea>
                    </div>
                </div>
                <div className="mt-2">
                    <span className="text-gray-600">Shared image</span>
                    <div className="border w-full h-9 rounded-md overflow-hidden border-black relative">
                        <input
                            type="text"
                            defaultValue="https://brandshark.com/wp-content/uploads/2023/02/9DEEF7F5-C215-43B9-BEBD-C8856AF52E30-1080x675.jpeg"
                            name="shared_image"
                            className="w-full h-full py-1 px-3 outline-none"
                            placeholder="Paste your link here"
                        />
                    </div>
                </div>
            </form>
        </>
    )
}

export default ShareForm
