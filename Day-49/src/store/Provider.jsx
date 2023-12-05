import { createContext, useEffect, useState } from "react"
import { client } from "../config/client"

export const GlobalContext = createContext()

function Provider({ children }) {
    const apiKey = JSON.parse(localStorage.getItem("apiKey"))
    const [loading, setLoading] = useState(false)
    const [login, setLogin] = useState(false)
    useEffect(() => client.setApiKey(apiKey), [apiKey])
    useEffect(() => {
        if(apiKey) {
            setLogin(true)
        }
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                loading,
                setLoading,
                login,
                setLogin
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default Provider
