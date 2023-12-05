import { useContext, useState } from "react"
import { getApiKey } from "../../config/client"
import { GlobalContext } from "../../store/Provider"
import cl from "./login.module.scss"
import { toast } from "react-toastify"

function Login() {
    const { setLoading, setLogin } = useContext(GlobalContext)
    const [inputValue, setInputValue] = useState('')

    const handleChange = e => {
        setInputValue(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        getApiKey(inputValue).then(res => {
            if(!res.response.ok) {
                toast.error("Email không tồn tại")
                setLoading(false)
                setInputValue('')
                return
            }
            localStorage.setItem("apiKey", JSON.stringify(res.data.data.apiKey))
            localStorage.setItem("userEmail", JSON.stringify(inputValue))
            setLogin(true)
            setLoading(false)
            setInputValue('')
        })

    }

    return (
        <div className={cl.formContainer}>
            <form className={cl.form} onSubmit={handleSubmit}>
                <div className={cl.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        value={inputValue}
                        onChange={handleChange}
                    />
                </div>

                <div className={cl.row}>
                    <button className={cl.formSubmitBtn} type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login
