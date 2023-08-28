// Bai 1
console.group("Bai 1")
    var arrA = [1, 4, 3, 2]
    var arrB = [5, 2, 6, 7, 1]

    const getNum = (arr1, arr2) => {
        const newArr = []
        arr1.map(num => {
            let index = arr2.indexOf(num)
            index != -1 ? newArr.push(arr2.at(index)) : [...newArr]
        })
        console.log(newArr)
        return newArr
    }

    getNum(arrA, arrB)
console.groupEnd()

// Bai 2
console.group("Bai 2")
    var deepArr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]]

    const handleFlatArr = (deepArr) => {
        let newArr = []
        const handleFlat = (arr) => {
            let flatArr = []
            loop(flatArr.concat(arr))
        }

        const handleCheck = (element) => {
            if(Array.isArray(element)) {
                handleFlat(element)
            }else {
                newArr.push(element)
            }
        }

        const loop = (arr) => {
            arr.map(element => {
                handleCheck(element)
            })
        }

        loop(deepArr)
        return(newArr)
    }

    console.log(handleFlatArr(deepArr))
console.groupEnd()

// Bai 3
console.group("Bai 3")
    var arr = [["a", 1, true, function() {}], ["b", 2, false, function() {}]]
    let type = []
    let result = []

    const handleClassify = (arr) => {
        const newArr = handleFlatArr(arr)

        newArr.map(element => {
            if(!type.includes(typeof element)){
                type.push(typeof element)
                result.push([])
            }
            if(type.includes(typeof element)) {
                result[type.indexOf(typeof element)].push(element)
            }
        })
        console.log(result)
        return result
    }

    handleClassify(arr)
console.groupEnd()

const posts = [
    {
        title: "This is title 1",
        desc: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, maiores nemo? Nobis suscipit quia eos commodi iure
        ipsam nesciunt aut corporis nulla exercitationem iste sint odio ab vel vero error inventore mollitia quae cum
        eligendi ipsum, unde velit natus? Iure ad esse voluptatibus reiciendis consectetur dolor cupiditate eum ea optio
        repellendus, blanditiis ullam id, error dicta ipsum dignissimos laudantium? Ut consequatur pariatur consectetur.`,
        image: 'https://files.fullstack.edu.vn/f8-prod/public-images/64d4ac76c4ff7.png'
    },
    {
        title: "This is title 2",
        desc: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, maiores nemo? Nobis suscipit quia eos commodi iure
        ipsam nesciunt aut corporis nulla exercitationem iste sint odio ab vel vero error inventore mollitia quae cum
        eligendi ipsum, unde velit natus? Iure ad esse voluptatibus reiciendis consectetur dolor cupiditate eum ea optio
        repellendus, blanditiis ullam id, error dicta ipsum dignissimos laudantium? Ut consequatur pariatur consectetur.`,
        image: 'https://files.fullstack.edu.vn/f8-prod/public-images/64d4ac76c4ff7.png'
    },
    {
        title: "This is title 3",
        desc: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, maiores nemo? Nobis suscipit quia eos commodi iure
        ipsam nesciunt aut corporis nulla exercitationem iste sint odio ab vel vero error inventore mollitia quae cum
        eligendi ipsum, unde velit natus? Iure ad esse voluptatibus reiciendis consectetur dolor cupiditate eum ea optio
        repellendus, blanditiis ullam id, error dicta ipsum dignissimos laudantium? Ut consequatur pariatur consectetur.`,
        image: 'https://files.fullstack.edu.vn/f8-prod/public-images/64d4ac76c4ff7.png'
    }
]

const html = posts.map((post, index) =>
    `
        <div class="post ${index % 2 != 0 && 'reverse'}">
            <image src="${post.image}" alt=""/>
            <div class="content">
                <h2>${post.title}</h2>
                <p>${post.desc}</p>
            </div>
        </div>
    `    
).join('')

const root = document.querySelector('#root')
root.innerHTML = html