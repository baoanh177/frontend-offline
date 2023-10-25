import { data } from "./courses.js";

const slideContainer = document.querySelector('.slideshow')
const courseListElement = document.querySelector('.course-list')
const proCourse = document.querySelector('.pro-courses')
const slideshowTemplate = document.getElementById('slide-template')
const courseTemplate = document.getElementById('course-template')

for (let i = 0; i < 4; i++) {
    courseListElement.append(courseTemplate.content.cloneNode(true));
}
slideContainer.append(slideshowTemplate.content.cloneNode(true))

const app = {
    data: {},
    getCourses() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(Object.keys(data).length > 0) {
                    resolve(data)
                }else {
                    reject("Không lấy được dữ liệu")
                }
            }, 2000)
        })
    },
    render() {
        const courseHtml = `
            <div class="heading">
                <h2 class="title">${this.data.pro_course.title}</h2>
            </div>
            <ul class="course-list">
                ${this.data.pro_course.courses.map(course => {
                    return `
                        <li class="course ${!course.is_published ? 'disabled' : ''}">
                            <div class="thumb">
                                <div class="icon-wrap">
                                    <div class="pro-icon">
                                        <img src="./crown-icon.svg" alt="">
                                    </div>
                                </div>
                                <img src="${course.image_url}" alt="">
                                <div class="overlay">
                                    <div class="see-course" onclick="document.querySelector('audio').play()">Xem khóa học</div>
                                </div>
                            </div>
                            <h3 class="course-name">${course.title}</h3>
                            <div class="price">
                                <span class="old-price">${course.is_published ? course.old_price.toLocaleString('vi-VN') + 'đ' : ''}</span>
                                <span class="new-price">${course.is_published ? course.price.toLocaleString('vi-VN') + 'đ' : ''}</span>
                            </div>
                        </li>
                    `
                }).join('')}
            </ul>
        `
        proCourse.innerHTML = courseHtml
        

        const slideHtml = `
            <div class="slideshow-left">
                <div class="title">${this.data.slideshow.title}</div>
                <p class="desc">
                    ${this.data.slideshow.desc}
                </p>
                <div class="see-more-btn">${this.data.slideshow.btn_content}</div>
            </div>
            <div class="slideshow-right">
                <img src="https://files.fullstack.edu.vn/f8-prod/banners/36/6454dee96205c.png" alt="">
            </div>
            <div class="slide-controls">
                <div class="prev">
                    <i class="fa-solid fa-chevron-left"></i>
                </div>
                <div class="next">
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
            </div>
        `

        slideContainer.innerHTML = slideHtml
    },
    start() {
        this.getCourses()
            .then(response => {
                this.data    = response
                this.render()
            })
            .catch(error => {
                console.error(error)
            })
    }
}

app.start()

