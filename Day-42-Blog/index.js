import { client } from "./client.js";
import { config } from "./config.js";
import validate from "./helper/validate.js";
import showToast from "./helper/toast.js";

const root = document.getElementById("root")

const app = {
    user: {},
    blogs: [],
    isLogin: false,
    registerForm() {
        return `
            <form class="container-sm register-form">
                <h1>Đăng kí</h1>
                <div class="form-group">
                    <label for="">Email address</label>
                    <input type="text" name="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="">Username</label>
                    <input type="text" name="name" class="form-control" placeholder="Username">
                </div>
                <div class="form-group">
                    <label for="">Password</label>
                    <input type="password" name="password" class="form-control" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary my-3 w-100">Đăng kí</button>
                </form>
            <button class="login-btn btn btn-success w-100">Đăng nhập</button>
            <button class="home-btn btn btn-warning w-100 my-3">Trang chủ</button>
        `
    },
    loginForm(email = '') {
        return `
            <form class="container-sm login-form">
                <h1>Đăng nhập</h1>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                        type="text"
                        class="form-control"
                        name="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value="${email}"
                    >
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" name="password" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary w-100 my-3">Đăng nhập</button>
            </form>
            <button class="register-btn btn btn-success w-100">Đăng kí</button>
            <button class="home-btn btn btn-warning w-100 my-3">Trang chủ</button>
        `
    },
    clearForm(form) {
        for(const input of form.querySelectorAll("input")) {
            input.value = ''
        }
        for(const input of form.querySelectorAll("textarea")) {
            input.value = ''
        }
    },
    home() {
        return `
            <div class="home-page">
                <div class="heading">
                    ${this.isLogin ? this.loggedLayout() : this.notLoggedLayout()}
                </div>

                <ul class="list-blog"></ul>
            </div>
        `
    },
    notLoggedLayout() {
        return `
            <h1>Blogger</h1>
            <button class="login-btn large-btn">Login</button>
        `
    },
    loggedLayout() {
        return `
            <div class="profile d-flex align-items-center gap-3">
                <div class="avatar">${this.user.name[0]}</div>
                <span class="username">${this.user.name}</span>
            </div>
            <div>
                <form class="container-sm blog-form">
                    <div class="d-flex justify-content-between mt-4">
                        <h1>New Blog</h1>
                        <button class="logout-btn">Logout</button>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Title</label>
                        <input type="text" class="form-control" name="title" placeholder="Title">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Content</label>
                        <textarea name="content" class="form-control" cols="30" rows="5" placeholder="Content"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="">Set time to Post</label>
                        <input type="date" class="form-control date" placeholder="Date">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        `
    },
    handlePostDate(date) {
        const postDate = new Date(date)
        const now = new Date()
        const seconds = Math.floor((now - postDate) / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        return days > 0 && `${days} ngày trước - ${postDate.getHours()} giờ ${postDate.getMinutes()} phút`
            || hours > 0 && `${hours} giờ trước - ${postDate.getHours()} giờ ${postDate.getMinutes()} phút`
            || minutes > 0 && `${minutes} phút trước - ${postDate.getHours()} giờ ${postDate.getMinutes()} phút`
            || seconds > 0 && `${seconds} giây trước - ${postDate.getHours()} giờ ${postDate.getMinutes()} phút`
            || "Vừa xong"
    },
    render() {
        root.innerHTML = this.home()
        this.getBlogs()
    },
    showBlog(blogs) {
        const html = blogs.map(blog =>
            `<li class="blog">
                <div class="head">
                    <div class="user-info">
                        <div class="avatar">
                            <img src="" alt="">
                        </div>
                        <span class="username">${blog.userId.name}</span>
                    </div>
                    <div class="more">
                        <div class="detail-blog"># view more ${blog.content.slice(0, 10)}...</div>
                        <div class="user-blog">${blog.userId.name}</div>
                    </div>
                </div>
                <div class="blog-content">
                    <div class="title">${blog.title}</div>
                    <div class="content">${blog.content}</div>
                </div>
                <div class="foot">
                    <div class="created-at">${this.handlePostDate(blog.timeUp)}</div>
                    <div class="read-time">
                        Khoảng
                        ${blog.content.split(' ').length / 60 > 1 
                        ? Math.ceil(blog.content.split(' ').length / 60) + " phút"
                        : blog.content.split(' ').length + " giây"}
                        đọc
                    </div>
                </div>
            </li>`
        ).join("")

        root.querySelector(".list-blog").innerHTML = html
        document.querySelector(".loading").style.visibility = "hidden" 
    },
    addEvent() {
        root.addEventListener("click", e => {
            if(e.target.classList.contains("login-btn")) {
                root.innerHTML = this.loginForm()
            }else if(e.target.classList.contains("logout-btn")) {
                this.logout()
            }else if(e.target.classList.contains("register-btn")) {
                root.innerHTML = this.registerForm()
            }else if(e.target.classList.contains("home-btn")) {
                root.innerHTML = this.home()
                this.showBlog(this.blogs)
            }
        })

        root.addEventListener("submit", e => {
            e.preventDefault()
            const btn = e.target.querySelector("button")
            if(e.target.classList.contains("login-form")) {
                const data = validate(e.target)
                if(data) {
                    this.login(data)
                }
            }else if(e.target.classList.contains("register-form")) {
                const data = validate(e.target)
                if(data) {
                    this.register(data)
                }
            }else if(e.target.classList.contains("blog-form")) {
                const data = validate(e.target)
                if(data) {
                    if(typeof data.postDate == "undefined") {
                        this.postBlog(data).then(() => this.clearForm(e.target))
                    }else if(typeof data.postDate == "string") {
                        this.clearForm(e.target)
                    }
                }
            }
        })
    },
    logout() {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        this.isLogin = false
        this.render()
    },
    async register(formData) {
        const { data: res, response } = await client.post("/auth/register", formData)
        console.log({ data: res, response })
        const toastData = {
            title: res.status_code,
            message: res.message,
            type: res.status_code
        }
        showToast(toastData)
        if(response.ok) {
            root.innerHTML = this.loginForm(formData.email)
        }
    },
    async login(formData) {
        const { data: res, response } = await client.post("/auth/login", formData)
        const toastData = {
            title: res.status_code,
            message: res.message,
            type: res.status_code
        }
        showToast(toastData)
        if(response.ok) {
            this.isLogin = true
            localStorage.setItem("access_token", JSON.stringify(res.data.accessToken))
            localStorage.setItem("refresh_token", JSON.stringify(res.data.refreshToken))
            this.user = res.data
            this.checkAuth()
            this.render()
        }
    },
    async postBlog(formData) {
        const { data: res, response } = await client.post("/blogs", formData)
        const toastData = {
            title: res.status_code,
            message: res.message,
            type: res.status_code
        }
        showToast(toastData)
        if(response.ok) {
            return this.getBlogs()
        }
    },
    async getBlogs() {
        const { data: res, response } = await client.get("/blogs")

        if(response.ok) {
            this.blogs = res.data
            this.showBlog(this.blogs)
        }
    },
    async checkAuth() {
        if(localStorage.getItem("access_token")) {
            try{
                const access_token = JSON.parse(localStorage.getItem("access_token"))

                if(!access_token) {
                    throw new Error("Access token doesn't exist")
                }

                client.setToken(access_token)

                const result = await client.get("/users/profile")
                if(!result) {
                    this.isLogin = false
                    this.logout()
                    return
                }
                this.user = result.data.data
                this.isLogin = true
                this.render()
            }catch(e) {
                // console.log(e)
            }
        }else {
            console.log("Access token không tồn tại")
        }
    },
    start() {
        client.setUrl(config.SERVER_AUTH_API)
        this.checkAuth()
        this.render()
        this.addEvent()
    }
}

app.start()