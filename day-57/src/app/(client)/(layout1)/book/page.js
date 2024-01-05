"use client"
import emailjs from "@emailjs/browser"

function Book() {
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
                    console.log(result.text)
                },
                (error) => {
                    console.log(error.text)
                }
            )
        e.target.reset()
    }

    return (
        <div className="border-t-2 py-10">
            <h2
                className="text-3xl font-bold text-center"
                id="dat-lich"
            >
                Tìm ưu đãi
            </h2>
            <div className="flex justify-end mt-8 mr-36">
                <form
                    className="
            mt-10 [&>div>input]:border-2 [&>div>input]:bg-transparent
            [&>div>select]:bg-transparent [&>div>input]:w-96 [&>div>select]:w-96 [&>div>select]:h-9
            [&>div>select]:border-2 
            [&>div>input]:h-9 [&>div]:flex [&>div]:flex-col flex flex-col gap-4
            "
                    onSubmit={sendEmail}
                >
                    <div>
                        <label>Email: </label>
                        <input type="email" name="contact" />
                    </div>
                    <div>
                        <label>Tôi muốn đến: </label>
                        <select name="country">
                            <option
                                value="Vietnam"
                                className="bg-black"
                            >
                                Vietnam
                            </option>
                            <option
                                value="China"
                                className="bg-black"
                            >
                                China
                            </option>
                            <option
                                value="Germany"
                                className="bg-black"
                            >
                                Germany
                            </option>
                        </select>
                    </div>
                    <div>
                        <label>Địa điểm cụ thể: </label>
                        <input type="text" name="address" required />
                    </div>
                    <div>
                        <label>Chúng tôi có: </label>
                        <input
                            type="number"
                            name="members"
                            required
                        />
                    </div>
                    <div>
                        <label>Bắt đầu từ: </label>
                        <input
                            type="date"
                            name="start_date"
                            required
                        />
                    </div>
                    <div>
                        <label>Chúng tôi có: </label>
                        <input type="date" name="end_date" required />
                    </div>
                    <button className="h-10 w-40 border-2  mt-5 transition hover:bg-white hover:cursor-pointer hover:text-black">
                        Tìm ngay
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Book
