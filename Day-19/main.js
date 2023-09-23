var customers = [
    "Ta Hoang An",
    "Dang Ngoc Son",
    "Tran Cong Luc",
    "Vu Thanh Khanh"
]

customers.forEach(customer => {
    var username = customer.slice(customer.lastIndexOf(" "))
    
    console.log(username)
})