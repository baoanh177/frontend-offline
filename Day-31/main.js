const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const inner = $('.inner')
const items = $$('li')

items.forEach((item) => {
    let elementOffsetY = 0
    
    const getElementOffsetY = e => {
        elementOffsetY = e.offsetY // Từ vị trí nhấn chuột đến top của element
        e.target.style.filter = "hue-rotate(40deg)"
        const handleDragEnd = () => {
            e.target.style.filter = ""
            handleArrange()
            e.target.removeEventListener('dragend', handleDragEnd)
        }
        e.target.addEventListener('dragend', handleDragEnd)
    }

    item.addEventListener('dragstart', getElementOffsetY)

    const handleDrag = e => {
        const nextElement = e.target.nextElementSibling
        let prevElement = e.target.previousElementSibling
        const elementPositionTop = e.clientY - elementOffsetY // Điểm trên cùng của item được kéo

        if(nextElement && elementPositionTop > nextElement.offsetTop + 10) { // + 10: kéo quá khoảng 10px thì thay đổi vị trí
            inner.insertBefore(item, nextElement.nextElementSibling)
        }else if(elementPositionTop > elementOffsetY && prevElement && elementPositionTop <= prevElement.offsetTop - 10) {
            // e cũng k biết giải thích cái if này sao đâu =))
            inner.insertBefore(item, item.previousElementSibling)
        }
    }

    item.addEventListener('drag', handleDrag)
})

const handleArrange = () => {
    $$('.module').forEach((item, index) => {
        item.querySelector('span').innerText = index + 1
    })

    $$('.lesson').forEach((item, index) => {
        item.querySelector('span').innerText = index + 1
    })
}

handleArrange()