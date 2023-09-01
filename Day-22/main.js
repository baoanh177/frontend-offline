console.group("Bai 1")
const arr = [
    {
        id: 1,
        name: "Chuyên mục 1",
        parent: 0
    },
    {
        id: 2,
        name: "Chuyên mục 2",
        parent: 0
    },
    {
        id: 3,
        name: "Chuyên mục 3",
        parent: 0
    },
    {
        id: 4,
        name: "Chuyên mục 2.1",
        parent: 2
    },
    {
        id: 5,
        name: "Chuyên mục 2.2",
        parent: 2
    },
    {
        id: 6,
        name: "Chuyên mục 2.3",
        parent: 2
    },
    {
        id: 7,
        name: "Chuyên mục 3.1",
        parent: 3
    },
    {
        id: 8,
        name: "Chuyên mục 3.2",
        parent: 3
    },
    {
        id: 9,
        name: "Chuyên mục 3.3",
        parent: 3
    },
    {
        id: 10,
        name: "Chuyên mục 2.2.1",
        parent: 5
    },
    {
        id: 11,
        name: "Chuyên mục 2.2.2",
        parent: 5
    }
]

function handleNested(arr) {
    const nestedArr = []

    arr.map((element) => {
        for (const value of arr) {
            if (value.parent == element.id) {
                element.child = element.child
                    ? [...element.child, value]
                    : [value]
            }
        }
        if (!element.parent && !nestedArr.includes(element)) {
            nestedArr.push(element)
        }
    })

    console.log(nestedArr)
}

handleNested(arr)
console.groupEnd()

// Bai 2
console.group("Bai 2")
    Array.prototype.reduce2 = function(callback, init) {
        let i = 0
        let acc = init
        if(arguments.length < 2) {
            i = 1
            acc = this[0]
        }
        for(i; i < this.length; i++) {
            acc = callback(acc, this[i], i, this)
        }
        return acc
    }

    const total = numbers.reduce2((acc, cur) => {
        return acc + cur
    }, 0)

    console.log(total)
console.groupEnd()
