export const client = {
    api: 'https://api-exercise-sopi.vercel.app/api/v1',
    async get(path) {
        const response = await fetch(this.api + path, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        })
        const data = await response.json()
        return {response, data}
    }
}