const passwordRegex =  /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(.{8,})$/
const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ 

export default function handleValidate(form) {
    const res = {
        isValid: true,
        message: ''
    }
    for(const input of form.querySelectorAll('input')) {
        if(input.classList.contains('required-field')) {
            if(input.value.trim() == '') {
                res.isValid = false
                res.message = "Điền đầy đủ thông tin vào anh zai ơii"
                break
            }
        }else if(input.classList.contains('email')) {
            if(input.value.trim() == '') {
                res.isValid = false
                res.message = "Điền email hộ em cái anh zai ơii"
                break
            }else if(!emailRegex.test(input.value)) {
                res.isValid = false
                res.message = "Email không hợp lệ anh zai ơii"
                break
            }
        }else if(input.classList.contains('password')) {
            if(input.value.trim() == '') {
                res.isValid = false
                res.message = "Password chưa điền anh zai ơii"
                break
            }else if(!passwordRegex.test(input.value)) {
                console.log(input.value)
                res.isValid = false
                res.message = "Password yếu quá anh zai ơii"
                break
            }
        }
    }
    return res
}