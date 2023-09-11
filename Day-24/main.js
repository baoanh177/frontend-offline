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
    // if(Number.isInteger(+number)) {
    //     const units = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín']
    //     const sub = [' nghìn ', ' triệu ', ' tỉ ']

    //     const handleDozens = (first, sec, last) => {
    //         if(first == 0 && sec == 0 && last == 0) {
    //             return ''
    //         }else if(sec == 0 && last == 0) {
    //             return `${first == 0 ? 'không' : `${units[first]}`} trăm linh ${units[last]}`
    //         }else {
    //             return `${first == 0 ? 'không' : `${units[first]}`} trăm linh ${units[last]}`
    //         }
    //     }

    //     const ingre = number.toLocaleString('vi-VN').split('.')


    //     const result = ingre.map(num => {
    //         if(num.length == 3) {
    //             if(num[0] != 0) {
    //                 return `${num[0] == 0 ? 'không' : units[num[0]]} trăm ` + // Hàng trăm
    //                 `${num[1] == 1 ? 'mười ' : `${units[num[1]]} mươi `}` + // Hàng chục
    //                 `${num[2] == 1 ? 'mốt' : units[num[2]]}`
    //             }
    //         }else if(num.length == 2) {
    //             return `${num[0] > 1 ? `${units[num[0]]} mươi` : 'mười'} ${num[1] == 1 ? 'mốt' : units[num[1]]}`
    //         }else {
    //             return units[num[0]]
    //         }
    //     })

    //     console.log(result)

    //     let count = 0
    //     for(let i = result.length - 1; i > 0; i--) {
    //         if(count == 3) {
    //             count = 0
    //         }
    //         result.splice(i, 0, sub[count])
    //         count++
    //     }
    //     console.log(result.join(''))
    // }
    console.log('Do có việc đột xuất nên chưa thể hoàn thiện. Em sẽ bổ sung vào đêm nay')
})(1000000000)
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