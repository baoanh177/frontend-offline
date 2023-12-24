import { toast } from "react-toastify"
import "./Login.css"
import { client, getApiKey } from "../../utils/client"


function Login({ onLogin, setLoading }) {

    const handleSubmit = e => {
        e.preventDefault()
        const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const data = Object.fromEntries([...new FormData(e.target)])
        if(data.email.trim() == '') {
            toast.warning("Vui lòng nhập email!")
        }else if(!emailPattern.test(data.email)) {
            toast.error("Email không hợp lệ!")
        }else {
            setLoading(true)
            client.setApiKey(null)
            getApiKey(data.email).then(res => {
                if(res?.response.ok) {
                    toast.success("Đăng nhập thành công")
                    localStorage.setItem('apiKey', JSON.stringify(res.data.data.apiKey))
                    onLogin(true)
                }
                setLoading(false)
            })
        }
    }

    return (
        <form className="form-control" onSubmit={handleSubmit}>
            <p className="title">Login</p>
            <div className="input-field">
                <input name="email" className="input" type="text" />
                <label className="label" htmlFor="input">
                    Enter Email
                </label>
            </div>
            <button className="submit-btn">Sign In</button>
        </form>
    )
}

export default Login
