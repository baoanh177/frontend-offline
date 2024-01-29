export const postUser = async userData => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })

    if(response.ok) {
        
    }
}