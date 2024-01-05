"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Button from "~/app/components/Button"
import { images } from "~/assets/images/images"
import { servicesData } from "~/servicesData"

function DetailPage({ params }) {
    const { id } = params
    const router = useRouter()
    const service = servicesData.find((service) => service.id == id)

    if (!service) {
        return <h1>Không tìm thấy sản phẩm</h1>
    }

    return (
        <div>
            <Image
                src={images.tokyo}
                alt=""
                className="w-full h-[400px] object-cover"
            />
            <div className="p-5">
                <h1 className="text-5xl font-bold">
                    {service.name}
                </h1>
                <p className="mt-5">
                    Thủ Đô {service.name} Không Chỉ Là Linh Hồn Của Đất Nước
                    Mặt Trời Mọc Mà Còn Được Đánh Giá Là Một Trong
                    Những Thành Phố Lớn Nhất, Hiện Đại Phát Triển Bậc
                    Nhất Và Đông Đúc Bậc Nhất Trên Thế Giới. Với Nhịp
                    Sống Hối Hả Của Người Dân, Đến Với Thủ Đô Tuyệt
                    Vời Này, Du Khách Sẽ Cảm Nhận Được Sự Sôi Động
                    Trong Mỗi Khoảnh Khắc, Mỗi Một Con Đường, Hết Sức
                    Thích Hợp Cho Những Vị Khách Từ Phương Xa Đam Mê
                    Du Lịch Khám Phá Một Vùng Đất Mới Năng Động Và
                    Hiện Đại.
                </p>
                <div className="my-5 text-2xl font-bold">Ưu đãi chỉ {service.price} cho 1người/ngày</div>
                <Button click={() => router.push('/pay/' + id)}>Đặt ngay</Button>
            </div>
        </div>
    )
}

export default DetailPage
