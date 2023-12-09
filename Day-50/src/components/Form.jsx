import { useRef } from "react"
import { toast } from "react-toastify"
import emailjs from '@emailjs/browser'

function Form({ user, logout, setLoading }) {
    console.log('re-render')
    const messRef = useRef()
    const emailRef = useRef()
    
    let languageNames
    if(user.locale) {
        languageNames = new Intl.DisplayNames([user.locale], {
            type: "language"
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        let isValid = true
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if(emailRef.current.value.trim() === '') {
            toast.error("Email không được bỏ trống!")
            isValid = false
        }else if(!regex.test(emailRef.current.value.trim())) {
            toast.error("Email không đúng định dạng!")
            isValid = false
        }

        if(messRef.current.value.trim() == '') {
            toast.error("Tin nhắn không được bỏ trống!")
            isValid = false
        }

        if(isValid) {
            setLoading(true)
            const data = {
                from_name: "F88",
                to_name: user.name,
                message: messRef.current.value
            }
    
            emailjs.send('baoanh', 'template_km7pvr1', data, "aN2weeejpVkzQCv4K")
                .then(function(response) {
                   toast.success("Gửi email thành công")
                   messRef.current.value = user.email ?? "example@email.com"
                   messRef.current.value = "Tôi cần hỗ trợ tài chính!"
                   setLoading(false)
                }, function(err) {
                    toast.error("Gửi email thất bại")
                    setLoading(false)
                });
        }
    }


    return (
        <div className="form-container">
            <div className="avatar">
                <img src={user.picture} alt="" />
            </div>
            <div className="info">
                <h3>Xin chào {user.name} !</h3>
                { languageNames && <p>Vị trí: {languageNames.of(user.locale)}</p> }
                { user.email && <p>Email: <a href={"mailto:" + user.email}>{user.email}</a></p> }
            </div>
            <form className="form" id="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Company Email</label>
                    <input
                        ref={emailRef}
                        type="text"
                        id="email"
                        name="email"
                        defaultValue={user.email ?? "example@email.com"}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="textarea">
                        Tin nhắn
                    </label>
                    <textarea
                        ref={messRef}
                        name="content"
                        id="textarea"
                        rows="10"
                        cols="50"
                        defaultValue="Tôi cần hỗ trợ tài chính!"
                    ></textarea>
                </div>
                <button className="form-submit-btn" type="submit">
                    Submit
                </button>
            </form>
            <button
                className="logout-btn"
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >Logout</button>
        </div>
    )
}

export default Form
