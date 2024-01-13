function MindmapPage() {
    return (
        <>
            <div>
                <div className="flex gap-5 items-center">
                    <span className="text-2xl font-bold">
                        Mindmap của tôi
                    </span>
                    <button className="px-3 py-1 rounded-md bg-green-600 text-white">Thêm</button>
                </div>
                <div className="my-5">
                    <ul className="h-[220px] w-full px-4 border-x-2">
                        <li className="w-52 rounded-lg h-full border-2">
                            <div className="h-3/4 border-b-2"></div>
                            <div className="px-2">
                                <div className="flex gap-2 items-center">
                                    <span className="text-sm font-bold w-3/4">
                                        Mindmap không tên
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className="inline-block w-[10px] h-[10px] rounded-[50%] bg-green-600"></span>
                                        <span className="text-xs">Pub</span>
                                    </div>
                                </div>
                                <span className="text-xs">11/11/2024 - 15:20</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default MindmapPage
