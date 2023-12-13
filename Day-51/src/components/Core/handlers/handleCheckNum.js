import { toast } from "react-toastify";

const handleCheckNum = (inputValue, winNumber) => {
    const result = {
        isValid: true,
        isCorrect: false,
        message: ''
    }

    for(const value of inputValue.prevValue) {
        if(inputValue.currentValue == value) {
            toast.warn("Bạn đã chọn số này rồi!")
            result.isValid = false
            return result
        }
    }
    
    if(inputValue.currentValue.trim() == '') {
        toast.warn("Chọn một số bất kì!")
        result.isValid = false
    }else if(+inputValue.currentValue === winNumber) {
        toast.success("Chúc mừng bạn đã trả lời đúng, bạn là nhất, bạn là số 1!")
        result.isCorrect = true
        result.message = "Chúc mừng bạn đã trả lời đúng, bạn là nhất, bạn là số 1!"
    }else if(+inputValue.currentValue < winNumber) {
        toast.info("Hmm... Bạn cần tăng một chút!")
        result.message = "Hmm... Bạn cần tăng một chút!"
    }else {
        toast.info("Hmm... Bạn cần giảm một chút!")
        result.message = "Hmm... Bạn cần giảm một chút!"
    }

    return result
}

export { handleCheckNum }