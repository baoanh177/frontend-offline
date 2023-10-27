import { data } from "./courses.js";

HTMLElement.prototype.removeSkeleton = function() {
    this.className = this.className.split(' ').map(className => className.includes('skeleton') ? '' : className).join('')
}

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const courseListElement = $('.course-list')

const getData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data)
        }, 2000)
    })
};

(() => {
    courseListElement.innerHTML = data.pro_course.courses.map(() => {
        return `
            <li class="course">
                <div class="thumb skeleton">
                    <div class="icon-wrap">
                        <img src="" class="pro-icon" alt="">
                    </div>
                    <img src="" class="skeleton" alt="">
                    <div class="overlay">
                        <div class="see-course">
                            Xem khóa học
                        </div>
                    </div>
                </div>
                <h3 class="course-name">
                    <div class="skeleton skeleton-text"></div>
                </h3>
                <div class="price skeleton skeleton-text">
                    <span class="old-price "></span>
                    <span class=" new-price"></span>
                </div>
            </li>
        `
    }).join('')

})()


getData().then(responseData => {
    const courses = $$('.course')
    document.querySelector('.heading .title').innerText = 'Khóa học Pro'
    document.querySelector('.heading .title').removeSkeleton()
    responseData.pro_course.courses.forEach((course, index) => {
        courses[index].querySelector('.icon-wrap').children[0].src = './crown-icon.svg'
        courses[index].querySelector('.thumb > img').src = course.image_url
        courses[index].querySelector('.course-name').innerText = course.title
        courses[index].querySelector('.old-price').innerText = course.old_price ? course.old_price.toLocaleString('vi-VN') + 'đ' : ''
        courses[index].querySelector('.new-price').innerText = course.price ? course.price.toLocaleString('vi-VN') + 'đ' : ''
        const skeletons = courses[index].querySelectorAll('*[class*=skeleton]')
        skeletons.forEach(element => {
         element.removeSkeleton()
      })
    })

    $('.slideshow .title').innerText = responseData.slideshow.title
    $('.slideshow .desc').innerText = responseData.slideshow.desc
    $('.slideshow .see-more-btn').innerText = responseData.slideshow.btn_content   
    $('.slideshow .see-more-btn').style.opacity = 1 
    $('.slideshow .slideshow-right img').src = responseData.slideshow.image
    $('.slideshow').removeSkeleton()
})