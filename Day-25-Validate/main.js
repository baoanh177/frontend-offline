const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const overlay = $('.overlay')
const loginBtn = $('.login-btn')
const formBlock = $('.form-block')

loginBtn.onclick = () => {
    formBlock.removeAttribute('hidden')
    overlay.removeAttribute('hidden')
    handleClearForm($('.login-form'))
    handleClearForm($('.register-form'))
    handleActiveLoginTab()
}

overlay.onclick = () => {
    formBlock.setAttribute('hidden', 'hidden')
    overlay.setAttribute('hidden', 'hidden')
}

const lgEmail = $('.login-form .email')
const lgPass = $('.login-form .password')
const lgSubmit = $('.login-form .submit-btn')
const lgSuccess = $('.login-form .success')
const lgPassToggle = $('#lg-pass-toggle')

function emailValidator(field) {
    const regex  = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    const emailMess = field.parentElement.parentElement.querySelector('.form-message')
    let isValid
    if(field.value == '') {
        emailMess.innerText = 'Không được để trống'
        isValid = false
    }else if(field.value.match(regex)) {
        emailMess.innerText = ''
        isValid = true
    }else {
        emailMess.innerText = 'Email không hợp lệ'
        isValid = false
    }
    if(isValid) {
        field.parentElement.classList.remove('error')
    }else {
        field.parentElement.classList.add('error')
    }
    return isValid
}

function requiredField(field) {
    const mess = field.parentElement.parentElement.querySelector('.form-message')
    let isValid
    if(field.value == '') {
        mess.innerText = 'Không được để trống'
        isValid = false
    }else {
        mess.innerText = ''
        isValid = true
    }
    if(isValid) {
        field.parentElement.classList.remove('error')
    }else {
        field.parentElement.classList.add('error')
    }
    return isValid
}

const lgValidateAll = () => {
    let isValid
    isValid = emailValidator(lgEmail)
    isValid = requiredField(lgPass)
    return isValid
}

lgEmail.oninput = lgValidateAll
lgPass.oninput = lgValidateAll
lgSubmit.onclick = function(e) {
    e.preventDefault()
    if(lgValidateAll()) {
        lgSuccess.innerText = 'Đăng nhập thành công'
    }
}

function handleShowPassword() {
    const inputWrap = this.parentElement
    const passToggle = inputWrap.querySelector('i')
    if(inputWrap.querySelector('[type="checkbox"]').checked) {
        passToggle.className = 'fa-regular fa-eye-slash'
        inputWrap.querySelector('.password').type = 'text'
    }else {
        passToggle.className = 'fa-regular fa-eye'
        inputWrap.querySelector('.password').type = 'password'
    }
}

lgPassToggle.onchange = handleShowPassword

const loginActive = $('.login.active-tab')
const login = $('.login')
const register = $('.register')

function handleActiveLoginTab() {
    login.classList.add('active-tab')
    register.classList.remove('active-tab')
    $('.login-form').style.display = 'block'
    $('.register-form').style.display = 'none'
    handleClearForm($('.register-form'))
}

login.onclick = handleActiveLoginTab
register.onclick = function() {
    register.classList.add('active-tab')
    login.classList.remove('active-tab')
    $('.login-form').style.display = 'none'
    $('.register-form').style.display = 'block'
    handleClearForm($('.login-form'))
}

if(loginActive) {
    $('.login-form').style.display = 'block'
    $('.register-form').style.display = 'none'
}else {
    $('.login-form').style.display = 'none'
    $('.register-form').style.display = 'block'
}

function handleClearForm(form) {
    const inputWraps = form.querySelectorAll('.input-wrap')
    const inputs = form.querySelectorAll('input')
    const formMess = form.querySelectorAll('.form-message')
    for(let i = 0; i< inputWraps.length; i++) {
        inputWraps[i].classList.remove('error')
        inputs[i].value = ''
        formMess[i].innerText = ''
    }
    form.querySelector('.success').innerText = ''
}

const rgValidateAll = () => {
    let isValid
    isValid = requiredField(rgName)
    isValid = emailValidator(rgEmail)
    isValid = requiredField(rgPass)
    return isValid
}

const rgName = $('.register-form .full-name')
const rgEmail = $('.register-form .email')
const rgPass = $('.register-form .password')
const rgSubmit = $('.register-form .submit-btn')
const rgSuccess = $('.register-form .success')
const rgPassToggle = $('#rg-pass-toggle')

rgName.oninput = rgValidateAll
rgEmail.oninput = rgValidateAll
rgPass.oninput = rgValidateAll
rgSubmit.onclick = function(e) {
    e.preventDefault()
    if(rgValidateAll()) {
        rgSuccess.innerText = 'Đăng kí thành công'
    }
}

rgPassToggle.onchange = handleShowPassword