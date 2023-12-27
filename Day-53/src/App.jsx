import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

import Home from "./pages/home"
import Login from "./pages/auth/Login"
import Loader from "./components/Loader"

function App() {
    const apiKey = JSON.parse(localStorage.getItem('apiKey'))
    const loading = useSelector(state => state.data.isLoading)
    const [isLogin, setLogin] = useState(false)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if(apiKey) {
            setLogin(true)
        }
    }, [])

    return <>
        <ToastContainer />
        {(loading || isLoading) && <Loader />}
        {isLogin ? <Home /> : <Login onLogin={setLogin} setLoading={setLoading} />}
    </>
}

export default App
