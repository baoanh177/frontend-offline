const SERVER_API = "https://api-todo-ebon.vercel.app/api/v1"

export const getApiKey = async (email) => {
    const response = await fetch(SERVER_API + '/api-key?email=' + email)
    const data = await response.json()
    return {response, data}
}

export const client = {
    serverApi: SERVER_API,
    apiKey: null,
    setApiKey(apiKey) {
        this.apiKey = apiKey
    },
    setUrl: function(url) {
        this.serverApi = url
    },
    send: async function (path, method = "GET", body = null) {
        const url = `${this.serverApi}${path}`
        //Tác vụ call api
        const headers = {
            "Content-Type": "application/json",
            "X-Api-Key": this.apiKey
        }
        const options = {
            method,
            headers
        }
        if (body) {
            options.body = JSON.stringify(body)
        }
        try {
            const response = await fetch(url, options)
                if(!response.ok) {
                    if(response.status == 401) {
                        console.warn("Có lỗi xảy ra vui lòng reload")
                        // localStorage.clear()
                    }
                }
            const data = await response.json()
            return { response, data }
        } catch (e) {
            throw new Error(e)
        }
    },
    get: function (url) {
        //Call API với get method
        return this.send(url)
    },
    post: function (url, body) {
        //Call API với post method
        return this.send(url, "POST", body)
    },
    put: function (url, body) {
        //Call API với put method
        return this.send(url, "PUT", body)
    },
    patch: function (url, body) {
        //Call API với patch method
        return this.send(url, "PATCH", body)
    },
    delete: function (url) {
        //Call API với delete method
        return this.send(url, "DELETE")
    }
}
