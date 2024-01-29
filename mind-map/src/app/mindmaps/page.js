import { getSession } from "@auth0/nextjs-auth0"
import Header from "../components/Header"
import HeaderInfo from "../components/HeaderInfo"
import AddFlowModal from "./components/AddFlowModal"
import FlowCard from "./components/FlowCard"
import { getData } from "./actions/handleGetData"

async function MindmapPage() {
    const data = await getSession()
    const { sub } = data.user
    const { data: resData } = await getData(sub)
    const { flows } = resData

    return (
        <>
            <Header>
                <HeaderInfo/>
            </Header>
            <div className="px-20 py-24 min-h-[calc(100vh)]">
                <div className="flex gap-5 items-center">
                    <span className="text-2xl font-bold">
                        Mindmaps
                    </span>
                    <AddFlowModal prevData={resData} />
                </div>
                <div className="my-5">
                    <ul className="h-[220px] w-full px-4 border-x flex gap-4">
                        {flows && flows.reverse().map(flow => <FlowCard key={flow.id} {...flow}/>)}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default MindmapPage
