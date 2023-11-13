import showToast from "./toast.js"
import definedPrototype from "./defined.js"

definedPrototype()

const passwordRegex =  /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(.{8,})$/
const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ 

export default function validate(form) {
    // const btnText = form.querySelector("button").innerHTML
    // form.disabled(true)
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
    if(toastData.message != '') {
        showToast(toastData)
        // form.disabled(btnText)
    }else {
        return data
    }
}

