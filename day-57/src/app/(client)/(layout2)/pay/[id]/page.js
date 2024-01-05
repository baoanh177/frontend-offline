"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import Button from "~/app/components/Button"
import { images } from "~/assets/images/images"
import { servicesData } from "~/servicesData"
import emailjs from "@emailjs/browser"

function PayPage({ params }) {
    const { id } = params
    const router = useRouter()
    const service = servicesData.find((service) => service.id == id)

    const sendEmail = (e) => {
        e.preventDefault()
        const data = Object.fromEntries([...new FormData(e.target)])

        console.log(data)

        emailjs
            .send(
                "baoanh",
                "template_gis9zhj",
                data,
                "aN2weeejpVkzQCv4K"
            )
            .then(
                (result) => {
                    toast.success('Thanh toán thành công')
                    setTimeout(() => {
                        router.push('/detail/' + id)
                    })
                },
                (error) => {
                    console.log(error.text)
                }
            )
        e.target.reset()
    }

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
                <h2 className="text-3xl font-bold">Thanh toán</h2>
                <form onSubmit={sendEmail}>
                <div className="[&>input]:bg-transparent [&>input]:border-2 [&>input]:h-9
                [&>select]:bg-transparent [&>select>option]:bg-black [&>select]:border-2 
                [&>input]:p-2 p-5 gap-5 [&>select]:h-9 grid grid-cols-2"
            >
                    <input type="text" name="phone" placeholder="Số điện thoại"/>
                    <input type="email" name="contact" placeholder="Email"/>
                    <input type="date" name="start_date" placeholder="Ngày bắt đầu"/>
                    <input type="number" name="member" placeholder="Số thành viên"/>
                    <select>
                        <option value="momo">Momo</option>
                        <option value="visa">Visa</option>
                        <option value="transfer">Chuyển khoản</option>
                    </select>
                    <Button>Đặt ngay</Button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default PayPage
