export const getDate = (inputDate) => {
    inputDate = new Date(inputDate)
    const year = inputDate.getFullYear()
    const month = inputDate.getMonth() + 1
    const date = inputDate.getDate()
    const hour = inputDate.getHours()
    const minutes = inputDate.getMinutes()
    return `${date}/${month}/${year} - ${hour}:${minutes}`
}