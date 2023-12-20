import { toast } from "react-toastify"

export const client = {
    api: "https://api-exercise-trello.vercel.app/api/v1",
    apiKey: null,
    setApiKey(apiKey) {
        this.apiKey = apiKey
    },
    async send(path='', method="GET", body) {

        const headers = {
            "Content-Type": "application/json"
        }

        if(this.apiKey) {
            headers["X-Api-Key"] = this.apiKey
        }
        
        const options = {
            headers,
            method,
        }

        if(body) {
            options.body = JSON.stringify(body)
        }

        const response = await fetch(this.api + path, options)
        const data = await response.json()

        if(!response.ok) {
            if(response.status === 401) {
                toast.error("Có lỗi xảy ra! Click here to đăng nhập lại!", {
                    onClick: () => {
                        localStorage.removeItem('apiKey')
                        location.reload()
                    }
                })
            }
        }

        return {response, data}
    },
    get(path) {
        return this.send(path)
    },
    post: function (url, body) {
        return this.send(url, "POST", body)
    },
    put: function (url, body) {
        return this.send(url, "PUT", body)
    },
    patch: function (url, body) {
        return this.send(url, "PATCH", body)
    },
    delete: function (url) {
        return this.send(url, "DELETE")
    }
}