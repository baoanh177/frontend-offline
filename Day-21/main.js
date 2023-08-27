// Bai 1
console.group("Bai 1")
    var errors = {
        name: {
            required: "Vui lòng nhập họ tên",
            min: "Họ tên phải từ 5 ký tự"
        },
        email: {
            email: "Định dạng email không hợp lệ",
            unique: "Email đã có người sử dụng",
            required: "Vui lòng nhập địa chỉ email"
        },
        password: {
            required: "Vui lòng nhập mật khẩu",
            same: "Mật khẩu phải khớp với mật khẩu nhập lại"
        }
    }

    function getError(field) {
        let message = ""
        if(field === "name") {
            message = errors.name.required
        }else if(field === "email") {
            message = errors.email.email
        }else if(field === "password") {
            message = errors.password.required
        }

        console.log(message)
    }

    getError('email')
console.groupEnd()

// Bai 2
console.group("Bai 2")
    var customers = [
        { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
        { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
        { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
    ]

    function createCustomer(customers) {
        const newCustomer = customers.sort((a, b) => a.age - b.age)
        newCustomer.map(customer => {
            customer.shortName = customer.name.slice(0, customer.name.indexOf(" ")) +
            customer.name.slice(customer.name.lastIndexOf(" "))
        })

        console.log(newCustomer)
    }

    createCustomer(customers)
console.groupEnd()

// Bai 3
console.group("Bai 3")
    const data = []

    const dataRegister = (name, password, email) => {
        if(!name || !password || !email) {
            console.log("Nhap day du thong tin!")
            return 0
        }

        data.push({
            name,
            password,
            email,
            role: "user",
        })

    }

    const handleLogin = (name, password) => {
        let loginData
        data.map(user => {
            if(name == user.name && password == user.password) {
                loginData = {
                    name: user.name,
                    password: user.password,
                    email: user.email,
                    role: user.role
                }
            }
        })
        if(loginData) {
            return loginData
        }else {
            return "Username || Password khong dung!"
        }
    }
    
    dataRegister("Bao Anh", "12344", "baoanh27042004@gmail.com")
    dataRegister("Bao Bao", "12344", "baoanh27042004@gmail.com")
    const dataLogin = handleLogin("Bao Anh", "12344")

    console.log("Data", data)
    console.log('Datalogin', dataLogin)
console.groupEnd()
