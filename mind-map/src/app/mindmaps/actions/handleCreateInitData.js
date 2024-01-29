export const handleCreateInitDat = async (id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/data`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id,
            flows: []
        })
    })
    if(response.ok) {

    }
}