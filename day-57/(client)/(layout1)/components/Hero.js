function Hero() {
    return (
        <div className="h-[600px] flex items-center flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6">
                Mọi chuyến đi đều đáng giá
            </h2>
            <p className="text-center text-xl leading-10">
                Khám phá các vùng đất mới cùng chúng tôi <br /> những
                chuyến đi đang chờ bạn
            </p>
            <button className="h-10 w-40 border-2 mt-5 transition hover:bg-white hover:cursor-pointer hover:text-black">
                Khám phá ngay
            </button>
        </div>
    )
}

export default Hero
