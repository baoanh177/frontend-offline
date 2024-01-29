"use client"

function Sidebar() {
    // const onDragStart = (event, nodeType) => {
    //     event.dataTransfer.setData('application/reactflow', nodeType);
    //     event.dataTransfer.effectAllowed = 'move';
    //   };

    return <>
        <aside className="flex">
            <div className="min-w-16 p-3 z-10 border-r-2 border-green-300 h-full flex flex-col items-center">
                <div className="text-center font-semibold">Toolbar</div>
                <div className="mt-3 flex flex-col gap-3 [&>div]:cursor-grab [&>div]:transition">
                    <div className="w-12 h-12 border-2 hover:bg-gray-300" onDragStart={(event) => onDragStart(event, 'input')}></div>
                    <div className="w-12 h-12 border-2 rounded-[50%] hover:bg-gray-300"></div>
                </div>
            </div>
            <div 
                className="flex items-center justify-center w-1 bg-green-300 h-full border-2 
                border-green-300 border-l-gray-50 cursor-col-resize"
            ></div>
        </aside>
    </>
}

export default Sidebar;