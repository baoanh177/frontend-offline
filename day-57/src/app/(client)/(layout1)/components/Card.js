function Card({ name, price }) {
    return <>
        <div className="border-2 p-5">
            <div className="h-52 border-2"></div>
            <h3 className="mt-4 text-2xl">{name}</h3>
            <p className="my-2">{name}-Thành Phố Của Nơi Giao Thoa Giữa Quá Khứ-Hiện Tại</p>
            <p>Quá Khứ-Hiện Tại Chuyến Đi Dành Cho Gia Đình 3N/2Đ</p>
            <div className="text-sm flex gap-3 items-baseline mt-4">
                <span className="text-xl">{price}</span>
                <span className="line-through">50.000.000</span>
            </div>
            <button className="h-10 w-40 border-2 mt-5 transition hover:bg-white hover:cursor-pointer hover:text-black">Đặt ngay</button>
        </div>
    </>
}

export default Card;