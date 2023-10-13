import { lyrics } from "./store/lyrics.js" // Lấy lyrics từ file lyrics.js

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const progressBar = $('.progress-bar')
const progress = $('.progress')
const playInner = $('.play-inner')
const playBtn = $('.play-btn')
const audio = $('.audio')
const dot = $('.progress .dot')
const time = $('.time')
const karaokeInner = $('.karaoke-inner');
const karaokeModel = $('.karaoke-model')
const openModel = $('.karaoke-btn')
const closeModel = $('.close')

const sentences = lyrics.sentences

let isDrag = false
let currentTime = progressBar.previousElementSibling
let durationTime = progressBar.nextElementSibling

////////////////////////////////////////////////  DEFINE PROTOTYPE  ////////////////////////////////////////////////////////

HTMLElement.prototype.show = function() {
    this.style.opacity = 1;
    this.style.visibility = 'visible';
};

HTMLElement.prototype.hide = function() {
    this.style.opacity = 0;
    this.style.visibility = 'hidden';
};



////////////////////////////////////////////////  FUNCTIONS  ////////////////////////////////////////////////////////

// Render
const render = () => {
    const html = sentences.map((sentence, senIndex) => {
        return `<div class="line" data-sen-index="${senIndex}">
            ${sentence.words.map((word) =>
                `<div class="word" data-start-time="${word.startTime}" data-end-time="${word.endTime}">
                    ${word.data}
                    <div class="back">${word.data}</div>
                </div>`
            ).join('')}
        </div>`
    }).join('')
    
    karaokeInner.innerHTML = html
}
render()

// Time convert
const timeConvert = sec => {
    const minutes = Math.floor(sec / 60)
    const seconds = Math.floor(sec - minutes * 60)
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}







////////////////////////////////////////////////  PROGRESS  ////////////////////////////////////////////////////////

// Create duration
audio.addEventListener('loadeddata', () => {
    durationTime.innerText = timeConvert(audio.duration)
})

dot.onmousedown = e => {
    mouseDownEventToggle()
    e.stopPropagation()
}

const mouseDownEventToggle = () => {
    isDrag = true
    $$('.line').forEach(sen => {
        for(const word of sen.children) {
            word.children[0].style.width = '0%'
        }
    })
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

const handleTooltip = e => {
    const position = e.clientX - (progressBar.offsetLeft + playInner.offsetLeft)
    const percent = position * 100 / progressBar.offsetWidth
    const seconds = audio.duration / 100  * percent
    time.style.visibility = 'visible'
    time.innerText = timeConvert(Math.floor(seconds))
    time.style.left = `${position}px`
}

// Update Progress
const handleUpdateProgress = () => {
    const curTime = audio.currentTime
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

progressBar.addEventListener('mousemove', handleTooltip)
progressBar.addEventListener('mouseout', () => time.style.visibility = 'hidden')

// Handle Pause & Play
playBtn.onclick = () => audio.paused ? audio.play() : audio.pause()
audio.onplay = () => {
    handleHighlightWord()
    playBtn.children[0].className = "fa-solid fa-pause"
}
audio.onpause = () => {
    playBtn.children[0].className = "fa-solid fa-play"
    cancelAnimationFrame(requestId)
}







////////////////////////////////////////////////  KARAOKE  ////////////////////////////////////////////////////////

let requestId
const words = $$('.word')

const handleHighlightWord = () => {
    words.forEach(word => {
        const startTime = word.dataset.startTime / 1000
        const endTime = word.dataset.endTime / 1000
        if(audio.currentTime >=  startTime) {
            const percent = ((audio.currentTime - startTime) / (endTime - startTime) * 100).toFixed(2)
            word.children[0].style.width = percent + '%'
        }
        if(audio.currentTime >= endTime) {
            word.children[0].style.width = "100%"
        }
        if(audio.currentTime < startTime) {
            word.children[0].style.width = "0%"
        }
    })
    requestId = requestAnimationFrame(handleHighlightWord)
}

openModel.onclick = () => karaokeModel.style.top = '0vh'
closeModel.onclick = () => karaokeModel.style.top = '100vh'

const sens = document.querySelectorAll('.line')

const handleShowSen = (currentMs) => {
    let i = 0
    if(currentMs > sentences[0].words[0].startTime - 3000) {
        sens[0].show()
        sens[1].show()
    }
    for(let index in sentences) {
        const startTime = sentences[index].words[0].startTime
        const endTime = sentences[index].words[sentences[index].words.length - 1].endTime
        if(currentMs >= startTime && currentMs < endTime) {
            sens[index].show()
        }
        if(currentMs > endTime) {
            sens[index].hide()
            sens[i + 2].show()
            i < sens.length - 3 && ++i // &&: Nếu vế trái đúng => thực thi vế phải, nếu vế trái sai => trả về kq vế trái
        }
        if(index > 0 && currentMs < sentences[index - 1].words[0].startTime) {
            sens[index].hide()
        }
    }
}