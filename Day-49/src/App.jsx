import { useContext, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext } from "./store/Provider";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Loader from "./components/Loader"

function App() {
    const { loading, login } = useContext(GlobalContext)

    useEffect(() => {
        if(login) {
            const email = JSON.parse(localStorage.getItem("userEmail"))
            toast.success("Em chào anh " + email.slice(0, email.lastIndexOf("@")) + ' nhé!')
        }
    }, [])

    return <div className="app">
        <ToastContainer />
        {login ? <Home /> : <Login />}
        {loading && <Loader />}
    </div>
}

export default App
