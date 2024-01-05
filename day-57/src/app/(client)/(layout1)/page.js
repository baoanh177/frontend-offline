import Image from "next/image";
import image from "~/assets/images/homeimg.jpg"

function HomePage() {
    return <div className="relative">
        <Image src={image} alt="" className="w-full h-[100vh] object-cover absolute z-[-1] font-bold" />
        <div className="h-[600px] flex items-center flex-col justify-center text-green-600 drop-shadow-sm">
            <h2 className="text-6xl font-bold mb-6">
                Mọi chuyến đi đều đáng giá
            </h2>
            <p className="text-center text-2xl leading-10">
                Khám phá các vùng đất mới cùng chúng tôi <br /> những
                chuyến đi đang chờ bạn
            </p>
        </div>
    </div>
}

export default HomePage;