const data = {
    slideshow: {
        title: "Đăng ký học Offline tại Hà Nội",
        desc: `Hình thức học Offline phù hợp nếu bạn muốn được hướng dẫn và hỗ trợ trực tiếp tại lớp. 
                Giờ học linh hoạt, phù hợp cả sinh viên và người đi làm.`,
        btn_content: 'nhận tư vấn'        
    },
    pro_course: {
        title: 'Khóa học Pro',
        courses: [
            {
                id: 15,
                is_published: true,
                title: "HTML CSS Pro",
                old_price: 2500000,
                price: 1299000,
                image_url:
                    "https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png"
            },
            {
                id: 27,
                is_published: true,
                title: "Ng\u00f4n ng\u1eef ti\u1ec1n x\u1eed l\u00fd Sass",
                old_price: 400000,
                price: 299000,
                image_url:
                    "https://files.fullstack.edu.vn/f8-prod/courses/27/64e184ee5d7a2.png"
            },
            {
                id: 19,
                is_published: false,
                title: "JavaScript Pro",
                price: 0,
                image_url:
                    "https://files.fullstack.edu.vn/f8-prod/courses/19/62f13cb607b4b.png"
            },
            {
                id: 20,
                is_published: false,
                title: "NextJS Pro",
                price: 0,
                image_url:
                    "https://files.fullstack.edu.vn/f8-prod/courses/20/648020fc16597.png"
            }
        ]
    }
}

export { data }
