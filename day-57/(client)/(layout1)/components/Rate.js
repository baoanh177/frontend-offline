function Rate() {
    return (
        <div className="mt-7 py-7">
            <h2
                className="text-3xl font-bold text-center"
                id="danh-gia"
            >
                Đánh giá
            </h2>
            <div className="mt-9 flex justify-end px-14">
                <form className="flex flex-col">
                    <textarea
                        className="w-[600px] h-48 border-2  resize-none bg-transparent p-4"
                        placeholder="Viết đánh giá của bạn"
                    ></textarea>
                    <button className="h-10 w-40 border-2  mt-5 transition hover:bg-white hover:cursor-pointer hover:text-black">
                        Gửi tới chúng tôi
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Rate
