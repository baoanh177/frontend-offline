// Bai 1
console.group("Bai 1")
function sum(...arg) {
    let total = 0
    for (const value of arg) {
        if (typeof value === "number") {
            total += value
        } else {
            console.log(`${value.trim()} k phai so!`)
            return
        }
    }
    console.log(`Total: ${total}`)
    return total
}

sum(1, 3, 4, 5)
console.groupEnd()

// Bai 2
console.group("Bai 2")
const price = 12000000

Object.prototype.getCurrency = function (unit) {
    return `${this.toLocaleString()} ${unit ? unit : ""}`
}

console.log(price.getCurrency("$"))
console.groupEnd()

// Bai 3
console.group("Bai 3")
const arr = [1, 2, 3]
Array.prototype.push2 = function (element) {
    this[this.length] = element
    return this.length
}

arr.push2(4)

console.log(arr)
console.groupEnd()

// Bai 4
console.group("Bai 4")
const arr4 = [1, 2, 3, 4, 5]
Array.prototype.filter2 = function (callback) {
    const newArr = []
    for (const index in this) {
        if (callback(this[index], index, this)) {
            newArr[newArr.length] = this[index]
        }
    }
    return newArr
}

const newArr = arr4.filter((value) => {
    return value % 2 == 0
})

console.log(newArr)

console.groupEnd()

// Bai 5
console.group("Bai 5")
const categories = [
    {
        id: 1,
        name: "Chuyên mục 1"
    },
    {
        id: 2,
        name: "Chuyên mục 2",
        children: [
            {
                id: 4,
                name: "Chuyên mục 2.1"
            },
            {
                id: 5,
                name: "Chuyên mục 2.2",
                children: [
                    {
                        id: 10,
                        name: "Chuyên mục 2.2.1"
                    },
                    {
                        id: 11,
                        name: "Chuyên mục 2.2.2"
                    },
                    {
                        id: 12,
                        name: "Chuyên mục 2.2.3"
                    }
                ]
            },
            {
                id: 6,
                name: "Chuyên mục 2.3"
            }
        ]
    },
    {
        id: 3,
        name: "Chuyên mục 3",
        children: [
            {
                id: 7,
                name: "Chuyên mục 3.1"
            },
            {
                id: 8,
                name: "Chuyên mục 3.2"
            },
            {
                id: 9,
                name: "Chuyên mục 3.3"
            }
        ]
    }
]

const html = categories.map(cate => {
    let child = 0
    let html = ''
    html += `<option value="">${cate.name}</option>`
    
    const loop = (element) => {
        ++child
        const handleLevel = child => {
            let level = ''
            for(let i = 1; i <= child; i++) {
                level += '--|'
            }
            return level
        }

        const level = handleLevel(child)
        
        for(let value of element) {
            html += `<option value="">${level}${value.name}</option>`
            handleCheck(value)
        }
    }

    const handleCheck = (element) => {
        if(element.children) {
            loop(element.children)
        }
    }
    
    handleCheck(cate)
    return html
}).join('')

document.write(
    `<select>
        <option value="" selected disabled hidden>Chon chuyen muc</option>
        ${html}
    </select>`)
console.groupEnd()
