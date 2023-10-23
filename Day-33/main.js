const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const getLink = $('.get-link')
const countdown = $('span')

let prevValue
let count = 10
let flag = true

window.addEventListener('visibilitychange', () => flag = !flag)

const getTime = () => {
    countdown.innerText = count
    console.log('re-render')
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
getLink.onclick = () => {
    count == 0 && window.open('//fullstack.edu.vn', '_blank')
}
