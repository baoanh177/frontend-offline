const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const recordBtn = $("button")
const recognition = new webkitSpeechRecognition() || new SpeechRecognition()

recognition.interimResults = true
recognition.lang = "vi-VN"

let result = ""

recognition.onresult = function (event) {
    result = event.results[0][0].transcript
}

recordBtn.onclick = function () {
    recognition.start()

    recordBtn.style.background = "lightcoral"
    recordBtn.innerText = "Anh Quân nói đi"
    $('.result').style.opacity = 0
    $('.message').style.opacity = 0
}

recognition.onend = function () {
    const res = result.toLowerCase().trim()
    const url = handleNavigation(res)

    recordBtn.style.background = "orange"
    recordBtn.innerText = "Nhấp vào em để nói!"
    if(result) {
        $('.message').style.opacity = 1
        $('.result').style.opacity = 1
        $('.result').innerText = `Đang thực hiện: ${result}...`
    }

    setTimeout(() => {
        if(url) {
            $('.result').innerText = "Được luôn anh Quân nhé!"
            setTimeout(() => window.open(url, "_blank"), 1000)
        }else {
            $('.result').innerText = "Cái đó phải dùng bản Premium mới có anh nhá :))"
        }
    }, 2000)
}

function handleNavigation(result) {

    const mapKeywords = ["chỉ đường tới", "chỉ đường đến", "chỉ đường", "đường đến", "đường tới", "tới", "đến"]
    const zingKeywords = ["nghe bài hát", "mở bài hát", "bài hát", "mở bài"]
    const youtubeKeyword = ["xem video", "mở video", "video"]

    for (const keyword of mapKeywords) {
        if (result.includes(keyword)) {
            let location = result.slice(result.indexOf(keyword) + keyword.length + 1)
            if(location.trim()) {
                return "//google.com/maps/search/" + `${location.replaceAll(" ", "+")}`
            }
        }
    }
    for (const keyword of zingKeywords) {
        if (result.includes(keyword)) {
            let songName = result.slice(result.indexOf(keyword) + keyword.length + 1)
            if(songName.trim()) {
                return "//zingmp3.vn/tim-kiem/tat-ca?q=" + `${songName.replaceAll(" ", "+")}`
            }
        }
    }
    for (const keyword of youtubeKeyword) {
        if (result.includes(keyword)) {
            let songName = result.slice(result.indexOf(keyword) + keyword.length + 1)
            if(songName.trim()) {
                return "//youtube.com/results?search_query=" + `${songName.replaceAll(" ", "+")}`
            }
        }
    }

    if (result == "google") {
        return "//google.com"
    } else if (result == "youtube") {
        return "//youtube.com"
    } else if (result == "facebook") {
        return "//facebook.com"
    } else if (result == "google drive") {
        return "//drive.google.com"
    } else if (result == "google maps") {
        return "//google.com/maps"
    }
}
