import showToast from "./toast.js"
import definedPrototype from "./defined.js"

definedPrototype()

const passwordRegex =  /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(.{8,})$/
const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ 

export default function validate(form) {
    const field = [...new FormData(form)]
    const data = Object.fromEntries(field)
    const toastData = {
        title: "FAILED",
        message: "",
        type: "FAILED"
    }


    for(const key of Object.keys(data)) {
        if(data[key].trim() == "") {
            toastData.message = "Vui lòng điền đầy đủ thông tin"
            break
        }
        if(key == "email") {
            if(!emailRegex.test(data[key])) {
                toastData.message = "Email không hợp lệ"
                break
            }
        }
        if(key == "password") {
            if(!passwordRegex.test(data[key])) {
                toastData.message = "Password yếu quá"
                break
            }
        }
    }
    
    const postDate = handleDate(form)
    
    if(toastData.message != '') {
        showToast(toastData)
    }else {
        if(postDate) {
            data.postDate = postDate
        }
        return data
    }
}

const handleDate = form => {
    const date = form.querySelector(".date")

    if(date && date.value) {
        const now = new Date()
        const postDate = new Date(date.value)
        
        if(postDate.getFullYear() == now.getFullYear()
        && postDate.getMonth() <= now.getMonth()
        && postDate.getDate() <= now.getDate()) {
            showToast({
                title: "FAILED",
                message: "Vui lòng chọn lại ngày",
                type: "FAILED"
            })
        return true
        }else {
            let newPostDate = postDate - 25200000
            const remainTime = newPostDate - now
            const seconds = remainTime / 1000
            const days = Math.floor(seconds / 86400)
            const hours = Math.floor((seconds - 86400 * days) / 3600)
            const minutes = Math.floor((seconds - (hours * 3600 + 86400 * days)) / 60)
            const mess = `Còn ${days ? days + 'ngày' : ''}
                ${hours ? hours + 'giờ' : ''}
                ${minutes ? minutes + 'phút' : ''}
                ${seconds ? Math.floor((seconds - (hours * 3600 + days * 86400 + minutes * 60))) + 'giây' : ''}`
            showToast({
                title: `Blog sẽ được đăng vào ${postDate.getDate()}/${postDate.getMonth() + 1}/${postDate.getFullYear()}`,
                message: mess,
                type: "SUCCESS"
            })
            const date = `${postDate.getDate()}/${postDate.getMonth() + 1}/${postDate.getFullYear()}`
            return date
        }
    }
}