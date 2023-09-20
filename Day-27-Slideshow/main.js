const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const carousel = $('.carousel')
const inner = $('.carousel-inner')
const nextBtn = $('.next')
const prevBtn = $('.prev')
const dots = $('.dots')

const carouselItems = inner.children
const itemWidth = inner.clientWidth
const totalWidth = itemWidth * carouselItems.length
const muoiPhanTram = itemWidth / 10

let position = 0
let dotHTML = ''
let slideIndex = 0
let isDrag = false

inner.style.width = `${totalWidth}px`

// Prev function
const handlePrev = () => {
    if(Math.abs(position) <= 0) {
        return
    }
    --slideIndex
    handleMove()
}

// Next function
const handleNext = () => {
    if(Math.abs(position) >= totalWidth - itemWidth) {
        return
    }
    ++slideIndex
    handleMove()
}

// Highlight function
const handleHighlightDot = () => {
    for(const element of dots.children) {
        if(element.dataset.index == slideIndex) {
            element.style.background = 'gold'
        }else {
            element.style.background = '#ccc'
        }
    }
}

// Move function
const handleMove = () => {
    position = -itemWidth * slideIndex
    Object.assign(inner.style, {
        transition: 'transform 0.4s ease',
        transform: `translateX(${position}px)`
    })
    handleHighlightDot()
}

// Create dots
for(let i = 0; i < inner.children.length; ++i) {
    dotHTML += `<div class="dot" data-index="${i}"></div>`
}
dots.innerHTML = dotHTML

nextBtn.addEventListener('click', handleNext)
prevBtn.addEventListener('click', handlePrev)

handleHighlightDot(0) // Highlight chấm đầu tiên

for(const element of dots.children) { // Lắng nghe sự kiện click vào các chấm
    element.onclick = () => {
        slideIndex = element.dataset.index
        handleMove()
    }
}

// Xu li keo tha
let mousePosition
carousel.onmousedown = (e) => {
    if(e.target.className != 'next' && e.target.className != 'prev') {
        isDrag = true
        mousePosition = e.clientX
        inner.style.transition = ''
    }
    
}

let moveSpace = 0
const handleDrag = e => {
    let canDrag = true
    if(isDrag) {
        if(slideIndex == 0 && e.clientX - mousePosition >= 0) {
            canDrag = false
        }else if(slideIndex == carouselItems.length - 1 && e.clientX - mousePosition < 0) {
            canDrag = false
        }
        if(canDrag) {
            moveSpace = mousePosition - e.clientX
            inner.style.transform = `translateX(${position - moveSpace}px)`
        }
    }
}

document.addEventListener('mousemove', handleDrag)

document.onmouseup = () => {
    if(Math.abs(moveSpace) >= muoiPhanTram) {
        moveSpace > 0 ? slideIndex++ : slideIndex--
        handleMove()
    }else {
        handleMove()
    }
    isDrag = false
    mousePosition = 0
    moveSpace = 0
}