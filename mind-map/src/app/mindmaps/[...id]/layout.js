function MindmapLayout({children}) {

    return <>
        <header 
            className="h-16 border-b-2 px-20 flex items-center justify-between fixed
             top-0 left-0 right-0 bg-white z-10 border-green-200">
            <div className="flex items-center gap-6">
                <h1 className="text-2xl font-bold text-green-600 whitespace-nowrap">Mindmap Flow</h1>
                
            </div>
        </header>
        <main className="mt-16 react-flow flex">
            <aside className="w-16 z-10 border-r-2 border-green-200 h-full">

            </aside>
            {children}
        </main>
    </>
}

export default MindmapLayout;