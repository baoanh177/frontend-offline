// Bai 1
console.group('Bai 1'); 
((numbers) => {
    if(Number.isInteger(+numbers)) {
        console.log(+String(numbers).split('').reverse().join(''))
    }
})(12345)
console.groupEnd()

// Bai 2
console.group('Bai 2');
((number) => {
    if(Number.isInteger(+number)) {
        const units = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín']
        const sub = [' nghìn ', ' triệu ', ' tỉ ']

        const handleThreeSo = (first, sec, last) => {
            if(first == 0 && sec == 0 && last == 0) {
                return ''
            }else if(sec == 0) {
                return `${first == 0 ? 'không' : units[first]} trăm ${last == 0 ? '' : `linh ${units[last]}`}`
            }else if(last == 0) {
                return `${first == 0 ? 'không' : units[first]} trăm ${sec == 1 ? `mười` : `${units[sec]} mươi`}`
            }else if(sec == 1) {
                return `${first == 0 ? 'không' : units[first]} trăm mười ${units[last]}`
            } else {
                return `${first == 0 ? 'không' : units[first]} trăm ${units[sec]} ${last == 1 ? 'mốt' : `${units[last]}`}`
            }
        }

        const handleTwoSo = (first, sec) => {
            if(first == 1 && sec == 1) {
                return 'mười một'
            }else if(first = 1) {
                return `mười ${units[sec]}`
            }else if(sec == 1) {
                return `${units[first]} mươi mốt`
            }else {
                return `${units[first]} mươi ${sec == 0 ? '' : units[sec]}`
            }
        }

        const ingre = number.toLocaleString('vi-VN').split('.')

        const result = ingre.map(num => {
            if(num.length == 3) {
                return handleThreeSo(num[0], num[1], num[2])
            }else if(num.length == 2) {
                return handleTwoSo(num[0], num[1])
            }else {
                return num[0] != 0 ? units[num[0]] : 'không'
            }
        })

        let count = 0
        for(let i = result.length - 1; i > 0; i--) {
            if(count == 3) {
                count = 0
            }
            result.splice(i, 0, sub[count])
            count++
        }
        console.log(result.join(''))
    }
})(213131423)
console.groupEnd()

// Bai 3
console.group('Bai 3')
const btn = document.querySelector('#btn')
const box = document.querySelector('.box')
btn.onclick = () => {
    let hex = '#'
    const texts = ['a', 'b', 'c', 'd', 'e', 'f']
    while(hex.length < 7) {
        const num = Math.ceil(Math.random() * 15)
        if(num > 9) {
            hex += texts[num - 10]
        }else {
            hex += num
        }
    }
    console.log(hex)
    box.style.background = hex
}
console.groupEnd()