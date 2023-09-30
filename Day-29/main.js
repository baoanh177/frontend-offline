const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const cartBody = $(".cart .cart-body")
const totalQtt = $(".cart tfoot td:nth-child(2)")
const totalPrice = $(".cart tfoot td:nth-child(3)")
const products = $$("tr[data-product-id]")
const updateBtn = $('.update')
const deleteBtn = $('.deleteAll')

const cart = []

products.forEach(productNode => {
    const addBtn = productNode.querySelector(".add")
    const productName = productNode.querySelector('td:nth-child(2)').innerText
    const price = productNode.querySelector('td:nth-child(3)').innerText
    const quantity = productNode.querySelector('input')

    addBtn.onclick = () => {
        productId = productNode.dataset.productId
        let isExist = false
        for(const product of cart) {
            if(product.id == productId) {
                isExist = true
                break
            }else {
                isExist = false
            }
        }
        if(isExist) {
            for(const product of cart) {
                if(product.id == productId) {
                    product.quantity += +quantity.value
                }
            }
        }else {
            cart.push({
                id: productId,
                name: productName,
                quantity: +quantity.value,
                price
            })
        }
        render()
    }
})

const render = () => {
    if(cart.length == 0) {
        $$('.cart').forEach(element => {
            element.style.visibility = 'hidden'
        })
        $('.cart span').style.visibility = 'visible'
    }else {
        $$('.cart').forEach(element => {
            element.style.visibility = 'visible'
        })
        $('.cart span').style.visibility = 'hidden'
    }
    let total = ttQuantity = 0
    const html = cart.map((product, index) => {
        let price = quantity = 0
        quantity += product.quantity
        price += product.price * quantity
        ttQuantity += quantity
        total += product.price * quantity
        return `<tr>
            <td>${index}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><input type="number" name="" id="" value="${quantity}" min="0"></td>
            <td>${price}</td>
            <td><button onclick=handleDeleteProduct(${index})>Xóa</button></td>
        </tr>`    
    }).join('')

    totalQtt.innerText = ttQuantity
    totalPrice.innerText = total
    cartBody.innerHTML = html
}

render()

const updateCart = () => {
    if(confirm("Are u sure?")) {
        const inputs = cartBody.querySelectorAll('input')
        let html = ""
        let total = ttQuantity = 0
        inputs.forEach((input, index) => {
            ttQuantity += +input.value
            total += cart[index].price * +input.value
            html += `<tr>
                <td>${index}</td>
                <td>${cart[index].name}</td>
                <td>${cart[index].price}</td>
                <td><input type="number" name="" id="" value="${input.value}" min="0"></td>
                <td>${cart[index].price * input.value}</td>
                <td><button onclick=handleDeleteProduct(${index})>Xóa</button></td>
            </tr>` 
        })
        
        totalQtt.innerText = ttQuantity
        totalPrice.innerText = total
        cartBody.innerHTML = html
        alert("Cap nhat thanh cong")
    }
}


const handleDeleteProduct = (id) => {
    for(const index in cart) {
        if(cart[index].id = id + 1) {
            cart.splice(index, 1)
            render()
            break
        }
    }
}
updateBtn.onclick = updateCart

deleteBtn.onclick = () => {
    if(confirm("Xac nhan xoa")) {
        cart.splice(0)
        alert("Xoa thanh cong")
        render()
    }
}