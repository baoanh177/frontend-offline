"use client"
import emailjs from "@emailjs/browser"
import { toast } from "react-toastify"

function Contact() {
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
                    toast.success(result)
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
                id="lien-he"
            >
                Liên hệ
            </h2>
            <div className="mt-7 flex gap-9">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13404.579392088504!2d105.81273265807444!3d20.97281589852109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad3e392fab91%3A0x92019169f960da95!2sThe%20Manor%20Central%20Park!5e0!3m2!1svi!2s!4v1704281678119!5m2!1svi!2s"
                    width="600"
                    height="450"
                    className="border-none"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <form
                    className="flex flex-col grow gap-5"
                    onSubmit={sendEmail}
                >
                    <div
                        className="
                    flex [&>input]:bg-transparent [&>input]:border-2 [&>input]:
                    [&>input]:h-9 [&>input]:outline-none [&>input]:w-full [&>input]:px-3 gap-5
                "
                    >
                        <input
                            type="text"
                            placeholder="Tên của bạn"
                            name="name"
                        />
                        <input
                            type="email"
                            placeholder="Email liên hệ"
                            name="contact"
                            required
                        />
                    </div>
                    <div
                        className="
                    flex [&>input]:bg-transparent [&>input]:border-2 [&>input]:
                    [&>input]:h-9 [&>input]:outline-none [&>input]:w-full [&>input]:px-3 gap-5
                "
                    >
                        <input
                            type="text"
                            placeholder="Số điện thoại"
                            name="phone"
                        />
                        <input
                            type="text"
                            placeholder="Chủ đề"
                            name="subject"
                        />
                    </div>
                    <textarea
                        className="h-48 border-2  resize-none bg-transparent p-4"
                        placeholder="Viết đánh giá của bạn"
                        name="content"
                    ></textarea>
                    <button className="h-10 w-40 border-2  mt-5 transition hover:bg-white hover:cursor-pointer hover:text-black">
                        Gửi tới chúng tôi
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Contact
