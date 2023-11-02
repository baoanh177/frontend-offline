import { client } from "./client.js"
import { config } from "./config.js"
const blogsElement = document.querySelector('.blogs')

const app = {
    totalPage: 0,
    query: {},
    render(blogs) {
        const html = blogs.map(blog => 
            `<li class="blog">
                <div class="row">
                    <div class="author">
                        <div class="avatar">
                            <img src="https://files.fullstack.edu.vn/f8-prod/user_photos/271546/63839d69bdaed.jpg" alt="">
                        </div>
                        <div class="author-name">${blog.username + ` - <strong>${this.query._page}</strong>`}</div>
                    </div>
                </div>
                <div class="content">
                    <h4 class="title">${blog.title}</h4>
                    <p class="desc">${blog.content}</p>
                </div>
                <div class="info">
                    <ul class="tags">
                        ${blog.tags.split(',').map(tag =>
                            `<li class="tag">${tag.trim()}</li>`
                        ).join('')}
                    </ul>
                    <div class="post-time">
                        <div class="post">19 ngày trước</div>
                        <div class="time">10 giờ 20 phút sáng</div>
                    </div>
                    <div class="read-time">Khoảng 9 phút đọc</div>
                </div>
            </li>`
        ).join('')

        blogsElement.innerHTML = blogsElement.innerHTML + html
        this.addEvent()
    },
    addEvent() {
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
    },
    async getBlogs(query = {}) {
        let queryString = new URLSearchParams(query).toString()
        if (queryString) {
            queryString = "?" + queryString
        }
        const {data: blogs} = await client.get('/blogs' + queryString)
        this.render(blogs)
    },
    start() {
        Object.assign(this.query, {
            _sort: 'id',
            _order: 'asc',
            _limit: config.PAGE_LIMIT,
            _page: 1
        })
        client.get('/blogs')
            .then(response => 
                this.totalPage = Math.ceil(response.data.length / config.PAGE_LIMIT)
            )
        this.getBlogs(this.query)
    }
}

app.start()