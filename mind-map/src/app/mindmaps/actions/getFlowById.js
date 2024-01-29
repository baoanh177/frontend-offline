export const getFlowById = async id => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/flows/${id}`)
    const data = await response.json()
    return data
}