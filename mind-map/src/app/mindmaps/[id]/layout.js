import { getSession } from "@auth0/nextjs-auth0"
import { notFound } from "next/navigation"
import FlowProvider from "~/providers/FlowProvider";
import { getData } from "../actions/handleGetData";
import ToolLayout from "./components/ToolLayout"

export async function generateMetadata({ params }) {
    const userSession = await getSession()
    const { sub } = userSession.user
    const { data: resData } = await getData(sub)
    const { flows } = resData
    const { id } = params
    const flow = flows.find(flow => flow.id == id)
    return {
        title: flow.title,
        description: flow.description,
        openGraph: {
            title: flow.share_data?.title,
            description: flow.share_data?.description,
            images: [flow.share_data?.shared_image],
        }
    }
}

async function MindmapLayout({params, children}) {
    const userSession = await getSession()
    const { sub } = userSession.user
    const { data: resData } = await getData(sub)
    const { flows } = resData
    const { id } = params
    const flow = flows.find(flow => flow.id == id)

    if(!flow) {
        return notFound()
    }

    return <>
        <FlowProvider flow={flow} dataId={resData.id}>
            <ToolLayout id={id} flows={flows} flow={flow} userData={resData} dataId={sub}/>
            <main className="h-[100vh] flex">
                { children }
            </main>
        </FlowProvider>
    </>
}

export default MindmapLayout;