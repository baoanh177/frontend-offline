const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const progressBar = $('.progress-bar')
const progress = $('.progress')
const playInner = $('.play-inner')
const playBtn = $('.play-btn')
const audio = $('.audio')
const dot = $('.progress .dot')
const time = $('.time')

let isDrag = false
let currentTime = progressBar.previousElementSibling
let durationTime = progressBar.nextElementSibling

const mouseDownEventToggle = () => {
    isDrag = true
    progressBar.removeEventListener('mousemove', handleCaiONhoNhoHienSoPhutKhiHoverAy)
    document.addEventListener('mousemove', handleDrag)
    audio.removeEventListener('timeupdate', handleUpdateProgress)
    time.style.visibility = 'hidden'
}

dot.onmousedown = e => {
    mouseDownEventToggle()
    e.stopPropagation()
}

// Mouse down
progressBar.onmousedown = e => {
    const percent = (e.offsetX * 100) / progressBar.clientWidth
    progress.style.width = `${percent}%`
    mouseDownEventToggle()
}

// Mouse up
document.addEventListener('mouseup', () => {
    isDrag = false
    const sec = audio.duration / 100 * +progress.style.width.replace('%', '')
    audio.currentTime = sec
    progressBar.addEventListener('mousemove', handleCaiONhoNhoHienSoPhutKhiHoverAy)
    document.removeEventListener('mousemove', handleDrag)
    audio.addEventListener('timeupdate', handleUpdateProgress)
})

// Handle Drag
const handleDrag = e => {
    if(isDrag) {
        const spaceX = e.clientX - (progressBar.offsetLeft + playInner.offsetLeft)
        let percent = (spaceX * 100) / progressBar.clientWidth
        if(percent < 0) {
            percent = 0
        }else if(percent > 100) {
            percent = 100
        }
        progress.style.width = `${percent}%`
        currentTime.innerText = timeConvert(audio.duration / 100 * percent)
    }
}

// Time convert
const timeConvert = sec => {
    const minutes = Math.floor(sec / 60)
    const seconds = Math.floor(sec - minutes * 60)
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

// Create duration
audio.addEventListener('loadeddata', () => {
    durationTime.innerText = timeConvert(audio.duration)
})

// Update Progress
const handleUpdateProgress = () => {
    const curTime = audio.currentTime
    currentTime.innerText = timeConvert(curTime)
    const percent = (curTime * 100) / audio.duration
    progress.style.width = `${percent}%`
    if(percent == 100) {
        progress.style.width = `${percent}%`
        audio.currentTime = 0
        audio.pause()
    }
}

const handleCaiONhoNhoHienSoPhutKhiHoverAy = e => {
    const position = e.clientX - (progressBar.offsetLeft + playInner.offsetLeft)
    const percent = position * 100 / progressBar.offsetWidth
    const seconds = audio.duration / 100  * percent
    time.style.visibility = 'visible'
    time.innerText = timeConvert(Math.floor(seconds))
    time.style.left = `${position}px`
}

progressBar.addEventListener('mousemove', handleCaiONhoNhoHienSoPhutKhiHoverAy)
progressBar.addEventListener('mouseout', () => time.style.visibility = 'hidden')

// Handle Pause & Play
playBtn.onclick = () => audio.paused ? audio.play() : audio.pause()
audio.onplay = () => playBtn.children[0].className = "fa-solid fa-pause"
audio.onpause = () => playBtn.children[0].className = "fa-solid fa-play"
