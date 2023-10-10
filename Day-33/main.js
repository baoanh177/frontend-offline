const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const getLink = $('.get-link')
const countdown = $('span')

let prevValue
let count = 30

let flag = true
window.onblur = () => flag = false
window.onfocus = () => flag = true
const getTime = () => {
    countdown.innerText = count
    let requestId = requestAnimationFrame(getTime)
    if(flag && (performance.now() / 1000).toFixed() > prevValue) {
        if(count > 0) {
             --count
        }else {
            getLink.disabled = false
            cancelAnimationFrame(requestId)
        }
    }
    prevValue = (performance.now() / 1000).toFixed()
    
}

getTime()

getLink.onclick = () => window.location.href = '//fullstack.edu.vn'
