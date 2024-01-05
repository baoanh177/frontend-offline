import { redirect } from "next/navigation";
import { servicesData } from "~/servicesData";

function Book({ params }) {
    const {id} = params
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
        <div className="w-[600px] mx-auto border-2">
            <form>
                <div className="[&>input]:bg-transparent [&>input]:border-2 [&>input]:h-9
                [&>select]:bg-transparent [&>select>option]:bg-black [&>select]:border-2 
                [&>input]:p-2 p-5 gap-5 [&>select]:h-9 grid grid-cols-2"
            >
                    <input type="text" name="phone" placeholder="Số điện thoại"/>
                    <input type="email" name="email" placeholder="Email"/>
                    <input type="date" name="start_date" placeholder="Ngày bắt đầu"/>
                    <input type="number" name="member" placeholder="Số thành viên"/>
                    <select>
                        <option value="momo">Momo</option>
                        <option value="visa">Visa</option>
                        <option value="transfer">Chuyển khoản</option>
                    </select>
                    <button className="h-9 w-40 border-2 transition hover:bg-white hover:cursor-pointer hover:text-black"
                    >
                        Đặt ngay
                    </button>
                </div>
            </form>
        </div>
    </>
}

export default Book;