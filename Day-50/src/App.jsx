import { useAuth0 } from "@auth0/auth0-react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login"
import Loader from "./components/Loader"
import Form from "./components/Form"
import { useState } from "react";

function App() {
    const { isLoading, isAuthenticated, user, logout } = useAuth0()
    const [loading, setLoading] = useState(false)
    
    return <div className="app">
        <ToastContainer />
        { isLoading && <Loader /> }
        { loading && <Loader /> }
        { isAuthenticated ? <Form user={user} logout={logout} setLoading={setLoading} /> : <Login /> }
    </div>
}

export default App
