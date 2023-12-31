function NotFound() {

    return <div className="fixed inset-0 flex flex-col gap-5 items-center justify-center">
        <span className="text-6xl font-bold">404 Not Found</span>
        <button className="h-9 w-20 rounded-lg bg-gray-900 text-white text-xl">Go Back</button>
    </div>
}

export default NotFound;