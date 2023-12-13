const handleProgress = e => {
    const rangeWidth = (window.innerWidth - 40)
    let percent = (e.clientX - 20) / rangeWidth * 100
    let num = 2048 / 100 * percent
    if(percent <= 0) {
        percent = 0
    }else if(percent >= 100) {
        percent = 100
    }
    if(num <= 5) {
        num = 5
    }else if(num >= 2048) {
        num = 2048
    }

    return {num, percent}
}

const handleMove = e => {
    
}

export { handleProgress, handleMove }