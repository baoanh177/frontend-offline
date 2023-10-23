const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// Component.create("hello-world", function() {
//     const div = document.createElement('div')
//     div.classList.add('box')
//     h2 = document.createElement("h2")
//     h2.innerText = "F8"
//     div.append(h2)
//     this.append(div)

//     const style = document.createElement("style")

//     const borderColor = this.getAttribute('border-color')

//     style.textContent = `
//         .box {
//             border: 1px solid ${borderColor ?? "#f00"};
//             padding: 15px;
//             border-radius: 15px;
//             text-align: center;
//         }
//     `

//     this.prepend(style)
// })

// const content = $('.content')

// const shadowRoot = content.attachShadow({
//     mode: "open"
// })

// shadowRoot.innerHTML = `
//     <style>
//         h1 {
//             color: green;
//         }
//     </style>
//     <h1>F8 - Học lập trình để đi làm</h1>
// `

// console.log([shadowRoot])

// Component.create("todo-item", function() {
//     const doName = this.innerText
//     const shadow = this.attachShadow({
//         mode: "closed"
//     })
//     shadow.innerHTML = `
//         <style>
//             .todo-item {
//                 border: 2px solid green;
//                 padding: 4px;
//                 margin: 10px 0;
//             }
//         </style>
//         <div class="todo-item">
//             <input type="checkbox">
//             ${doName}
//         </div>
//     `;
//     console.log(this.shadowRoot)
// })

/*
    Template la mot the HTML dac biet dung de tao 1 mau giao dien 
    -> Thuong duoc ap dung cho cac web compenent
*/

// const btn = $('.btn')
// const todo = $('.todo')

// let count = 0

// const todoItemTemplate = `<h3>Công việc: {count}</h3>`
// const template = document.createElement("template")
// template.innerHTML = todoItemTemplate

// const shadow = todo.attachShadow({
//     mode: 'closed'
// })

// var todoItemEl = btn.addEventListener('click', function() {
//     const todoItem = template.content.cloneNode(true)

//     const style = document.createElement("style")
//     style.textContent = `
//         h3 {
//             color: green;
//         }
//     `

//     todoItem.children[0].innerText = todoItem.children[0].innerText.replaceAll('{count}', ++count)
//     todoItem.prepend(style)
//     shadow.append(todoItem)
// })



Component.create("counter-app", function() {
    this.innerHTML = `
        <h1>Count: 0</h1>
        <button>+</button>
    `
})