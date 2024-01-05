"use client"
import emailjs from "@emailjs/browser"
import { toast } from "react-toastify"

function Rate() {
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
                    toast.success('Đánh giá thành công')
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

    return (
        <div className="mt-7 py-7">
            <h2
                className="text-3xl font-bold text-center"
                id="danh-gia"
            >
                Đánh giá
            </h2>
            <div className="mt-9 flex justify-end px-14">
                <form className="flex flex-col" onSubmit={sendEmail}>
                    <input type="email" name="contact" className="h-10 w-[600px] border-2 bg-transparent my-5 px-5" placeholder="Email" />
                    <textarea
                        className="w-[600px] h-48 border-2 resize-none bg-transparent p-4"
                        placeholder="Viết đánh giá của bạn"
                        name="content"
                        required
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
