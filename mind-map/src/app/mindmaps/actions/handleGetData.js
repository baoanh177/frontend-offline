export const getData = async id => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/data/${id}`, {
        cache: "no-cache",
        next: {
            tags: ["flows"]
        }
    })
    const data = await response.json()
    return { response, data }
}