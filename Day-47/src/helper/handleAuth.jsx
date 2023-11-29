import { client, getApiKey } from "../config"

export const handleAuth = (email, setApiKey) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (regex.test(email)) {
        getApiKey(email).then(res => {
            if(res.response.ok) {
                localStorage.setItem("apiKey", JSON.stringify(res.data.data.apiKey))
                localStorage.setItem("username", JSON.stringify(email.slice(0, email.lastIndexOf('@'))))
                client.setApiKey(res.data.data.apiKey)
                if(setApiKey) {
                    setApiKey(res.data.data.apiKey)
                }
            }
        })
    }else {
        console.log('invalid')
    }
}
