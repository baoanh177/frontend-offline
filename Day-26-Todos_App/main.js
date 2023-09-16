/*
    Đoạn nào không hiểu thì a mới đọc comment, chứ đọc hết đang dễ thành khó đấy =))))

    $: Viết tắt của document.querySelector
    $$: Viết tắt của document.querySelectorAll

    render() => Lặp qua `list` rồi trả về một mảng `html` => join('') vào được một chuỗi HTML => todoList.innerHTML
    submitBtn.onclick => Thêm phần tử mới là object có key là `id` và `title` vào `list`
        => gọi lại render() để lặp lại `list` rồi render lại 

*/

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const todoInput = $('.todo-input')
const submitBtn = $('.submitBtn')
const todoList = $('.todo-list')

var id = 0 // id của các todo trong array bên dưới
const list = [] // Array này để chứa các todo, hiện tại thì chưa có gì nhưng bên dưới sẽ xử lí để thêm todo
/*
    EX: list = [
        {
            id: 1,
            title: "Học Javascript"
        },
        {...}
    ]

    => Lặp qua list này rồi render ra giao diện
*/

function render() {
    const html = list.map(function(todo) {
        /*
            Sự kiện onclick em lắng nghe luôn trong thẻ html ấy
            Cái đoạn replaceAll để thay dấu < trong các thẻ html thành cái mã kia,
                không lúc ghi <h1>Hello</h1> nó lại bị to ra
            Dưới kia không comment được =)))
        */
        return `
            <li class="todo-item" data-index="${todo.id}">
                <div class="content-wrapper">
                    <span class="content">${todo.title.replaceAll('<', '&lt;')}</span>
                    <div class="actions">
                        <div class="edit" onclick="handleEdit(${todo.id})">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </div>
                        <div class="delete" onclick="handleDelete(${todo.id})">
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>
                <div class="input-wrapper">
                    <input type="text" class="edit-input">
                    <button class="complete-edit">Add Task</button>
                </div>
            </li>
        `
    }).join('')
    
    todoList.innerHTML = html
    handleSetModelWidth() // tính lại width của .model
    console.log('re-render')
}

function handleEdit(index) {
    const editItem = $(`li[data-index="${index}"]`)
    const content = editItem.querySelector('.content')
    const editInput = editItem.querySelector('.edit-input')
    const submit = editItem.querySelector('.complete-edit')

    editItem.querySelector('.content-wrapper').style.display = 'none'
    editItem.querySelector('.input-wrapper').style.display = 'flex'
    editInput.value = content.innerText

    submit.onclick = function() {
        if(editInput.value) { // Kiểm tra trong input có giá trị thì sẽ cho sửa lại, nếu không thì lấy giá trị khi chưa sửa
            content.innerText = editInput.value
        }
        editItem.querySelector('.content-wrapper').style.display = 'flex'
        editItem.querySelector('.input-wrapper').style.display = 'none'
        handleSetModelWidth()
        
    }
}

function handleDelete(index) {
    for(const i in list) {
        if(list[i].id == index) {
            delete list[i]
            render()
        }
    }
}

function handleSetModelWidth() {
    let maxWidth = 308 // 308 là do em lấy width .model ban đầu trừ đi padding, margin,...
    $$('.content').forEach(element => { // Lặp để tìm todo nào width lớn nhất thì đặt làm width của .model
        if(element.offsetWidth > maxWidth) {
            maxWidth = element.offsetWidth
        }
    })
    $('.model').style.width = maxWidth + 60 + 32 + 40 + 10 + "px"
    // 60: padding .model trái phải 30px
    // 32: padding .content-wrapper trái phải 16px
    // 40: width của .actions (2 cái icon sửa xóa)
    // 10: bị lệch nên cộng thêm
}


submitBtn.onclick = function() {
    if(todoInput.value) { // Kiểm tra nếu input có value mới sử lí để thêm
        list[list.length] = {
            id: ++id, // ++ để không bị trùng id với todo trước
            title: todoInput.value
        } // Thêm phần tử vào array `list`

        todoInput.value = '' // reset lại input & focus
        todoInput.focus()
        render() // gọi render để lặp lại `list` => cập nhật ra giao diện
    }
}

render()