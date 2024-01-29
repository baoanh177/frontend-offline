"use server"
import { revalidateTag } from "next/cache"

export const postFlow = async newData => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/data/${newData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newData)
    })
    if(response.ok) {
        revalidateTag("flows")
    }
}