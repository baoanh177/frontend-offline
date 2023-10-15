const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const imageBox = $('.box')
const zoom = $('.zoom')
const zoomImage = $('.zoom-image')
const zoomBox = $('.zoom-box')

const zoomCenterY = zoom.offsetHeight / 2
const zoomCenterX = zoom.offsetWidth / 2

zoomImage.style.height = imageBox.offsetHeight / zoom.offsetHeight * imageBox.offsetHeight + 'px'
zoomImage.style.width = imageBox.offsetWidth / zoom.offsetWidth * imageBox.offsetWidth + 'px'

imageBox.addEventListener('mousemove', (e) => {
    zoom.style.visibility = 'visible'
    zoom.style.opacity = 0.5

    zoomBox.style.visibility = 'visible'
    zoomBox.style.opacity = 1

    let zoomPositionTop = e.offsetY - zoomCenterY
    let zoomPositionLeft = e.offsetX - zoomCenterX

    if(zoomPositionTop <= 0) {
        zoomPositionTop = 0
    }else if(zoomPositionTop >= imageBox.offsetHeight - zoom.offsetHeight) {
        zoomPositionTop = imageBox.offsetHeight - zoom.offsetHeight
    }

    if(zoomPositionLeft <= 0) {
        zoomPositionLeft = 0
    }else if(zoomPositionLeft >= imageBox.offsetWidth - zoom.offsetWidth) {
        zoomPositionLeft = imageBox.offsetWidth - zoom.offsetWidth
    }

    zoom.style.top = zoomPositionTop + 'px'
    zoom.style.left = zoomPositionLeft + 'px'

    const topPercent = zoomPositionTop / imageBox.offsetHeight * 100
    const leftPercent = zoomPositionLeft / imageBox.offsetWidth * 100

    zoomImage.style.top = -(zoomImage.offsetHeight / 100 * topPercent) + 'px'
    zoomImage.style.left = -(zoomImage.offsetWidth / 100 * leftPercent) + 'px'

})

imageBox.addEventListener('mouseout', () => {
    zoom.style.visibility = 'hidden'
    zoom.style.opacity = 0
    zoomBox.style.visibility = 'hidden'
    zoomBox.style.opacity = 0
})