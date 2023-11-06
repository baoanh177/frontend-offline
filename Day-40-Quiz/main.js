const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const root = $('.inner')
const completed = $('.completed')
const streakEl = $('.display').querySelector('.total')

const quizTime = 5
let query = {}
let totalQuiz = 0
let quizs = {}
let score = 0
let streak = 0
let bonus = 0
let streakWidth = 0

const getQuiz = async (query = {}) => {
    let queryString = new URLSearchParams(query)

    if(queryString) {
        queryString = '?' + queryString
    }

    return await fetch("https://q4lkdm-8080.csb.app/question" + queryString)
        .then((response) => {
            totalQuiz = response.headers.get('x-total-count')
            return response.json()
        })
        .then(data => {
            quizs = data
            render(data)
        })
        .then(() => addEvent())
}

function render(quiz) {
    const html = `
        <div class="ques">
            <div class="title">${quiz[0].content}</div>
            <i class="note">Choose 1 correct answer</i>
        </div>
        <ul class="answers">
            ${quiz[0].answers.map(result =>
                `<li class="answer" data-id="${result.id}">${result.answer}</li>`    
            ).join('')}
        </ul>
    `
    root.innerHTML = html
}

Object.assign(query, {
    _limit: 1,
    _page: 1
})

function headerRender() {
    console.log('render')
    completed.children[0].innerText = query._page <= totalQuiz ? query._page : totalQuiz 
    completed.children[1].innerText = totalQuiz
    streakEl.innerText = streak
    $('.score span').innerText = score + bonus
    bonus = streak * 100 > 300 ? 300 : streak * 100
    $('.bonus span').innerText = '+' + bonus
    $('.hihi').style.width = streakWidth + '%'
}

function addEvent() {
    const answers = $$('.answer')
    headerRender()
    const timerId = setTimeout(() => {
        if(query._page < totalQuiz) {
            query._page++
            getQuiz(query)
        }else {
            console.log('end')
            handleEndQuiz()
        }
        headerRender()
    }, quizTime * 1000)
    answers.forEach(answer => {
        answer.onclick = () => {
            for(const a of answers) {
                a.style.opacity = 0
            }
            query._page++
            answer.style.pointerEvents = 'none'
            answer.style.opacity = 1
            answer.style.outline = '5px solid lightblue'
            clearTimeout(timerId)
            setTimeout(() => {
                for(const ans of quizs[0].answers) {
                    if(answer.dataset.id == ans.id) {
                        if(ans.is_correct) {
                            answer.style.outline = ''
                            answer.style.background = '#0f0'
                            streak++
                            score += 100
                            if(streakWidth == 66) {
                                streakWidth = 100
                            }else {
                                streakWidth += 33
                            }
                            break
                        }else {
                            answer.falseCase()
                            break
                        }
                    }
                }
                setTimeout(() => {
                    if(query._page <= totalQuiz) {
                        getQuiz(query)
                    }else {
                        headerRender()
                        handleEndQuiz()
                    }
                    }, 1000)
            }, 1000)
        }
    })
}

function handleEndQuiz() {
    $('.end').style.display = 'flex'
}

HTMLElement.prototype.falseCase = function() {
    const answers = $$('.answer')
    this.style.background = "#f00"
    this.style.outline = ""
    if(score < 100) {
        score = 0
    }else {
        score -= 100
    }
    streak = 0
    streakWidth = 0
    $('.score span').innerText = score
    for(const answer of answers) {
        for(const ans of quizs[0].answers) {
            if(answer.dataset.id == ans.id && ans.is_correct) {
                answer.style.opacity = 1
                answer.style.background = "#0f0"
                answer.style.transform = "translateY(-10px)"
                console.log(answer)
            }
        }
    }
}

$('.start-btn').onclick = () => {
    let count = 3
    $('.start').querySelector('h1').style.display = 'block'
    $('.start-btn').style.display = 'none'
    const timerId = setInterval(() => {
        if(count == 0) {
            clearInterval(timerId)
            getQuiz(query)
            $('.start').style.opacity = 0
            $('.start').style.visibility = 'hidden'
        }
        $('.start').querySelector('h1').innerText = count--
    }, 1000)    
}
