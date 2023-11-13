export default async function refreshToken (client) {
    try {
        const refresh_token = JSON.parse(localStorage.getItem("refresh_token"))

        const { data: res, response } = await client.post("/auth/refresh-token", {
            refreshToken: refresh_token
        })

        if(!response.ok) {
            throw new Error("Refresh token is empty")
        }

        saveToken(res.data.token)
        return res.data.token.accessToken
    }catch(e) {
        // console.log(e)
    }
}

const saveToken = ({accessToken, refreshToken}) => {
    localStorage.setItem("access_token", JSON.stringify(accessToken))
    localStorage.setItem("refresh_token", JSON.stringify(refreshToken))
}