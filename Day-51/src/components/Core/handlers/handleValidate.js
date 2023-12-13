import { toast } from "react-toastify";

const numberValidate = (value, toNum) => {
    const NANregex = /[^0-9]/
    if (value.currentValue.trim() == "") {
        return value
    } else if (NANregex.test(value.currentValue)) {
        toast.warn("Vui lòng nhập số!")
    } else {
        if (value.currentValue > toNum) {
            toast.warn(`Vui lòng nhập số từ 1 đến ${toNum}`)
        } else if (value.currentValue < 1) {
            toast.warn(`Vui lòng nhập số từ 1 đến ${toNum}`)
        } else {
            return value
        }
    }
}

export { numberValidate }