export async function requestRefresh(client) {
    try {
        const { refreshToken } = JSON.parse(localStorage.getItem("tokens"))
        if(!refreshToken) {
            throw new Error("Không tồn tại Refresh")
        }
        // const { response, data } = await client.post("/auth/refresh-token", {
        //     refreshToken
        // })

        console.log(response)

        if(!response.ok) {
            throw new Error("Refresh token Unauthorize")
        }

        saveToken(data)
        
        return data
    }catch(e) {
        console.log(e)
    }
}

const saveToken = (tokens) => {
    localStorage.setItem("tokens", JSON.stringify(tokens))
}