import { client } from "./client.js"
import { config } from "./config.js"
import showToast from "./helper/toast.js"
import handleValidate from "./helper/validator.js"

const root = document.querySelector('#root')
const blogsElement = document.querySelector('.blogs')
const loginModal = document.querySelector('.login-modal')
const registerModal = document.querySelector('.register-modal')
const blogModal = document.querySelector('.blog-modal')
const newBlogBtn = document.querySelector('.new-blog')
const inputs = document.querySelectorAll('input')

HTMLElement.prototype.disabled = function(status) {
    if(status) {
        this.querySelector("button").disabled = true
        this.querySelector("button").style.pointerEvents = "none"
    }else {
        this.querySelector("button").disabled = false
        this.querySelector("button").style.pointerEvents = "all"
    }
}

const app = {
    totalPage: 0,
    blogs: [],
    query: {},
    isLogin: false,
    render(blogs) {
        const html = blogs.map(blog => 
            `<li class="blog">
                <div class="row">
                    <div class="author">
                        <div class="avatar">
                            <img src="https://files.fullstack.edu.vn/f8-prod/user_photos/271546/63839d69bdaed.jpg" alt="">
                        </div>
                        <div class="author-name">${blog.userId.name}</div>
                    </div>
                </div>
                <div class="content">
                    <h4 class="title">${blog.title}</h4>
                    <p class="desc">${blog.content}</p>
                </div>
                <div class="info">
                    <div class="post-time">
                        <div class="post">19 ngày trước</div>
                        <div class="time">10 giờ 20 phút sáng</div>
                    </div>
                    <div class="read-time">Khoảng
                     ${blog.content.split(' ').length < 60 ?
                     blog.content.split(' ').length + ' giây':
                     Math.floor(blog.content.split(' ').length / 60) + ' phút'} 
                     đọc</div>
                </div>
            </li>`
        ).join('')

        blogsElement.innerHTML = blogsElement.innerHTML + html
        this.addEvent()
    },
    async register(data) {
        const { response, data: resData } = await client.post('/auth/register', data)
        const message = {
            title: resData.status_code,
            message: resData.message,
            type: resData.status_code
        }
        if(!response.ok) {
            showToast(message)
            return
        }
        registerModal.disabled(false)
        showToast(message)
    },
    async login(payload) {
        const { response, data: resData } = await client.post('/auth/login', payload)
        const message = {
            title: resData.status_code,
            message: resData.message,
            type: resData.status_code
        }
        if(!response.ok) {
            showToast(message)
            return
        }
        this.isLogin = true
        localStorage.setItem("tokens", JSON.stringify({
            access_token: resData.data.accessToken,
            refresh_token: resData.data.refreshToken
        }))
        this.checkAuth()
        this.handleCloseModal(null, loginModal)
        showToast(message)
    },
    async logout() {
        const { response, data: resData } = await client.post("/auth/logout")
        const message = {
            title: resData.status_code,
            message: resData.message,
            type: resData.status_code
        }
        if(!response.ok) {
            showToast(message)
            return    
        }
        this.isLogin = false
        showToast(message)
        localStorage.removeItem("tokens")
        this.checkAuth()
    },
    handleCloseModal(e, element) {
        if(element) {
            element.style.opacity = 0
            element.style.visibility = 'hidden'
            element.querySelectorAll("textarea").forEach(e => {
                e.value = ''
            })
            inputs.forEach(input => {
                input.classList.remove("error-field")
                input.value = ''
            })
        }else if(e){
            if(e.target.classList.contains('close-form-modal')
            || e.target.classList.contains('fa-xmark')) {
                e.target.closest('.form-modal').style.opacity = 0
                e.target.closest('.form-modal').style.visibility = 'hidden'
                inputs.forEach(input => {
                    input.classList.remove("error-field")
                    input.value = ''
                })
                e.target.closest('.form-modal').querySelectorAll("textarea").forEach(e => {
                    e.value = ''
                })
            }
        }
    },
    addEvent() {
        // Handle scroll
        const handleScroll = e => {
            const scrollTop = document.documentElement.scrollTop + window.innerHeight
            const lastBlog = document.querySelector('.blogs .blog:last-child')
            if(lastBlog && scrollTop > lastBlog.offsetTop + lastBlog.offsetHeight) {
                if(this.query._page < this.totalPage) {
                    this.query._page++
                    document.querySelector('b').innerHTML = `<div class="custom-loader"></div>`
                        this.getBlogs(this.query)
                    window.removeEventListener('scroll', handleScroll)
                }else {
                    document.querySelector('b').innerHTML = '--- Hết Blog ---'
                }
            }
        }
        window.addEventListener('scroll', handleScroll)

        // Login modal
        root.addEventListener("click", e => {
            if(e.target.classList.contains('sign-in')) {
                if(loginModal.style.opacity == 1) {
                    loginModal.style.opacity = 0
                    loginModal.style.visibility = 'hidden'
                }else {
                    loginModal.style.opacity = 1
                    loginModal.style.visibility = 'visible'
                }
            }
        })

        // Modal close
        root.addEventListener('click', e => {
            this.handleCloseModal(e)
        })

        // Register modal
        root.addEventListener("click", e => {
            if(e.target.classList.contains('sign-up')) {
                if(registerModal.style.opacity == 1) {
                    registerModal.style.opacity = 0
                    registerModal.style.visibility = 'hidden'
                }else {
                    registerModal.style.opacity = 1
                    registerModal.style.visibility = 'visible'
                }
            }
        })

        // New Blog
        newBlogBtn.onclick = e => {
            if(this.isLogin) {
                if(blogModal.style.opacity == 1) {
                    blogModal.style.opacity = 0
                    blogModal.style.visibility = 'hidden'
                }else {
                    blogModal.style.opacity = 1
                    blogModal.style.visibility = 'visible'
                }
            }
        }

        // Đăng ký
        registerModal.addEventListener("submit", e => {
            e.preventDefault()
            const name = registerModal.querySelector(".name").value
            const email = registerModal.querySelector(".email").value
            const password = registerModal.querySelector(".password").value

            registerModal.disabled(true)
            const res = handleValidate(registerModal)
            if(res.isValid) {
                this.register({name, email, password})
            }else {
                showToast({
                    title: "FAILED",
                    message: res.message,
                    type: "FAILED"
                })
            }  
        })

        // Đăng nhập
        loginModal.addEventListener("submit", e => {
            e.preventDefault()
            const email = loginModal.querySelector('.email').value
            const password = loginModal.querySelector('.password').value
            
            const res = handleValidate(loginModal)
            if(res.isValid) {
                this.login({ email, password })
            }else {
                showToast({
                    title: "FAILED",
                    message: res.message,
                    type: "FAILED"
                })
            }
            loginModal.querySelector("button").disabled = true
            this.checkAuth()
        })

        // Đăng xuất
        root.addEventListener('click', e => {
            if(e.target.classList.contains('logout')
            || e.target.classList.contains('fa-right-from-bracket')
            ) {
                this.logout()
            }
        })

        // Post blog
        blogModal.addEventListener("submit", e => {
            e.preventDefault()
            const title = blogModal.querySelector(".title").value
            const content = blogModal.querySelector(".content").value

            blogModal.disabled(true)
            const res = handleValidate(blogModal)
            if(res.isValid) {
                this.postBlog({title, content})
            }else {
                showToast({
                    title: "FAILED",
                    message: res.message,
                    type: "FAILED"
                })
            }
        })
    },
    async getBlogs(query = {}) {
        let queryString = new URLSearchParams(query).toString()
        if (queryString) {
            queryString = "?" + queryString
        }
        const {data: blogs} = await client.get('/blogs' + queryString)
        this.blogs = blogs.data
        this.render(blogs.data)
    },
    async postBlog(payload) {
        const { response, data: resData } = await client.post("/blogs", payload)
        const message = {
            title: resData.status_code,
            message: resData.message,
            type: resData.status_code
        }
        if(!response.ok) {
            showToast(message)
            return
        }
        blogModal.disabled(false)
        showToast(message)
        this.handleCloseModal(null, blogModal)
        this.getBlogs()
    },
    showProfile(name) {
        if(this.isLogin) {
            document.querySelector(".account").innerHTML = `
                <div class="profile">
                    <div class="avatar">
                        ${name.slice(0, 1)}
                    </div>
                    <span class="name">${name}</span>
                </div>
                <div class="logout">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </div>
            `
        }else {
            document.querySelector(".account").innerHTML = `
                <div class="sign-in">Đăng nhập</div>
                <div class="sign-up">Đăng kí</div>
            `
        }
    },
    async handleRefreshToken(refreshToken) {
        const {data: resData, response} = await client.post("/auth/refresh-token", {
            refreshToken: refreshToken
        })

        console.log({resData, response})
        if(response.ok) {
            localStorage.setItem("tokens", JSON.stringify(resData.data.token))
        }else {
            console.log("Không set được token")
        }

    },
    async checkAuth() {
        if(localStorage.getItem("tokens")) {
            try{
                
                const {access_token: accessToken, refresh_token: refreshToken} = JSON.parse(localStorage.getItem('tokens'))
                if(!accessToken) {
                    throw new Error("Access Token Not Exists")
                }
                client.setToken(accessToken)
                
                
                const {data: resData, response} = await client.get("/users/profile")
                if(response.status == 401) {
                    this.handleRefreshToken(refreshToken)
                }
                if(!response.ok) {
                    this.isLogin = false
                    return
                }
                this.isLogin = true
                this.showProfile(resData.data.name)
            }catch(e) {
                console.log(e)
            }
        }else {
            this.showProfile()
        }
    },
    start() {
        Object.assign(this.query, {
            _sort: 'id',
            _order: 'asc',
            _limit: config.PAGE_LIMIT,
            _page: 1
        })

        // Sao response.headers.get("x-total-count") đoạn này nó lại ra null nhỉ
        // Cả đoạn await bên trên cũng vậy
        client.get('/blogs')
            .then(response => 
                this.totalPage = Math.ceil(response.data.length / config.PAGE_LIMIT)
            )
        this.getBlogs(this.query).then(() => {
            blogsElement.querySelector('.custom-loader').style.display = 'none'
        })
        this.checkAuth()
    }
}

app.start()

