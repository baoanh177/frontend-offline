"use client"
import { redirect, useRouter } from "next/navigation";
import { servicesData } from "~/servicesData";

function DetailPage({ params }) {
    const {id} = params
    const router = useRouter()
    const service = servicesData.find(service => service.id == id)
    if(!service) {
        redirect('/not-found')
    }
    return <>
        <div className="h-[400px] w-full border-2 flex flex-col justify-center items-center">
            <h1 className="font-bold text-4xl">{service.name}</h1>
            <p className="w-[600px] text-center mt-5">
                {service.name} không chỉ là trung tâm tài chính – kinh tế, kinh đô điện ảnh –
                thời trang của Ấn Độ, mà đây còn là thành phố cảng vừa hiện đại nhưng
                vẫn mang nhiều nét cổ kính với những công trình kiến trúc, quán bar,
                nhà hàng, viện bảo tàng và các cửa hàng thời trang hấp dẫn…
            </p>
        </div>
        <div className="w-[600px] flex items-end border-2 p-5 mx-auto">
            <div className="w-[300px] text-3xl font-bold">Ưu đãi {service.price} cho 5người/3ngày</div>
            <button className="h-10 w-40 border-2 mt-5 transition hover:bg-white hover:cursor-pointer hover:text-black"
                onClick={() => router.push('/book/' + id)}
            >
                Đặt ngay
            </button>
        </div>
    </>
}

export default DetailPage;