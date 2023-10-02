import lyrics from "./store/lyrics.js" // Lấy lyrics từ file lyrics.js

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const progressBar = $('.progress-bar')
const progress = $('.progress')
const playInner = $('.play-inner')
const playBtn = $('.play-btn')
const audio = $('.audio')
const dot = $('.progress .dot')
const time = $('.time')
const karaokeModel = $('.karaoke-model')
const openModel = $('.karaoke-btn')
const closeModel = $('.close')
const songInfo = $('.info')

const sentences = lyrics.sentences

let isDrag = false
let currentTime = progressBar.previousElementSibling
let durationTime = progressBar.nextElementSibling

dot.onmousedown = e => {
    mouseDownEventToggle()
    e.stopPropagation()
}

const mouseDownEventToggle = () => {
    isDrag = true
    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', handleMouseUp)
    audio.removeEventListener('timeupdate', handleUpdateProgress)
    progressBar.removeEventListener('mousemove', handleTooltip)
    time.style.visibility = 'hidden'
}

// Mouse down
progressBar.onmousedown = e => {
    const percent = (e.offsetX * 100) / progressBar.clientWidth
    progress.style.width = `${percent}%`
    mouseDownEventToggle()
}

const handleMouseUp = () => {
    isDrag = false
    const sec = audio.duration / 100 * +progress.style.width.replace('%', '')
    audio.currentTime = sec
    progressBar.addEventListener('mousemove', handleTooltip)
    document.removeEventListener('mousemove', handleDrag)
    audio.addEventListener('timeupdate', handleUpdateProgress)
    document.removeEventListener('mouseup', handleMouseUp)
}

// Mouse up
document.addEventListener('mouseup', handleMouseUp)

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

// const handleHighlightWord = (curTime) => {
//     const currentMs = curTime * 1000
//     sentences.forEach((sentence, senIndex) => {
//         const senNode = $(`[data-sen-index="${senIndex}"]`)
//         sentence.words.forEach((word, wordIndex) => {
//             const wordNode = senNode.querySelector(`[data-word-index="${wordIndex}"]`)
//             if(currentMs >= word.startTime && currentMs < word.endTime) {
//                 const wordTime = word.endTime - word.startTime
//                 wordNode.children[0].style.animation = `highlight ${wordTime}ms forwards linear`
//             }else if(currentMs > word.endTime) {
//                 wordNode.children[0].style.width = '100%'
//             }else if(currentMs <= word.startTime) {
//                 wordNode.children[0].style.width = '0%'
//             }
//         })
//     })
// }

// Update Progress
const handleUpdateProgress = () => {
    const curTime = audio.currentTime
    // handleHighlightWord(curTime)
    handleShowSen(curTime * 1000)
    currentTime.innerText = timeConvert(curTime)
    const percent = (curTime * 100) / audio.duration
    progress.style.width = `${percent}%`
    if(percent == 100) {
        progress.style.width = `${percent}%`
        audio.currentTime = 0
        audio.pause()
    }
}

const handleTooltip = e => {
    const position = e.clientX - (progressBar.offsetLeft + playInner.offsetLeft)
    const percent = position * 100 / progressBar.offsetWidth
    const seconds = audio.duration / 100  * percent
    time.style.visibility = 'visible'
    time.innerText = timeConvert(Math.floor(seconds))
    time.style.left = `${position}px`
}

progressBar.addEventListener('mousemove', handleTooltip)
progressBar.addEventListener('mouseout', () => time.style.visibility = 'hidden')




////////// Karaoke ////////////
const karaokeInner = $('.karaoke-inner');

const render = () => {
    const html = sentences.map((sentence, senIndex) => {
        return `<div class="line" data-sen-index="${senIndex}">
            ${sentence.words.map((word, wordIndex) =>
                `<div class="word" data-word-index="${wordIndex}">
                    ${word.data}
                    <div class="back">${word.data}</div>
                </div>`
            ).join('')}
        </div>`
    }).join('')
    
    karaokeInner.innerHTML = html
}

// Handle Pause & Play
playBtn.onclick = () => audio.paused ? audio.play() : audio.pause()
audio.onplay = () => {
    playBtn.children[0].className = "fa-solid fa-pause"
    $$('.back').forEach(element => {
        element.style.animationPlayState = 'running'
    })
}
audio.onpause = () => {
    playBtn.children[0].className = "fa-solid fa-play"
    $$('.back').forEach(element => {
            element.style.animationPlayState = 'paused'
    })
}

openModel.onclick = () => karaokeModel.style.top = '0vh'
closeModel.onclick = () => karaokeModel.style.top = '100vh'

render()
const sens = $$('.line')

const handleShowSen = (currentMs) => {
    let i = 0
    if(currentMs > sentences[0].words[0].startTime - 3000) {
        sens[0].style.opacity = 1
        sens[1].style.opacity = 1
        songInfo.style.opacity = 0
    }else if(currentMs < sentences[0].words[0].startTime - 3000) {
        songInfo.style.opacity = 1
    }
    for(let index in sentences) {
        const startTime = sentences[index].words[0].startTime
        const endTime = sentences[index].words[sentences[index].words.length - 1].endTime
        if(currentMs >= startTime && currentMs < endTime) {
            sens[index].style.opacity = 1
        }
        if(currentMs > endTime) {
            sens[index].style.opacity = 0
            sens[i + 2].style.opacity = 1
            i < sens.length - 3 && ++i // &&: Nếu vế trái đúng => thực thi vế phải, nếu vế trái sai => trả về kq vế trái
        }
        if(index > 0 && currentMs < sentences[index - 1].words[0].startTime) {
            sens[index].style.opacity = 0
        }
    }
}