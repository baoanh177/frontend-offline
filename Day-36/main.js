

class F8 {
    static component = (name, props) => {
        customElements.define(name, class extends HTMLElement {
            constructor() {
                super()
                this.innerHTML = props.template

                if(props.data) {
                    const data = props.data()
                    Object.keys(data).forEach(key => {
                        window[key] = data[key]
                    })
                }
                
                const loop = () => {
                    Array.from(this.children).forEach(element => {
                        Array.from(element.attributes).forEach(att => {
                            if(att.localName.includes("v-on:")) {
                                const event = element.attributes[0].localName.split(':').at(1)
                                const action = element.attributes[0].value
                                element.addEventListener(event, (e) => {
                                    eval(action)
                                    this.render()
                                })
                            }
                        })
                    })
                }

                this.render = function() {
                    
                    const results = props.template.match(/{{.+?}}/g)
                    let html = props.template
                    if(results) {
                        results.forEach(variable => {
                            const vari = variable.replaceAll("{", '').replaceAll('}', '')
                            html = html.replaceAll(variable, eval(vari))
                        })
                    }
                    this.innerHTML = html
                    loop()
                }

                this.render()
            }
        })
    }
}

const $ = document.querySelector.bind(document)
const audio = $('audio')
const gif = $('.box img')

F8.component("counter-app", {
    data: () => {
        return {
            count: 0,
            title: "Counter app"
        }
    },
    template: `
        <h1>{{ title }}</h1>
        <h2>Đã đếm: {{ count }} lần</h2>
        <button v-on:click="count--">-</button>
        <button v-on:click="count++">+</button>
        <button v-on:dblclick="title='App counter'">Change title</button>
        <button v-on:click="audio.play(); gif.style.opacity = 1; setTimeout(() => {
            gif.style.opacity = 0
        }, audio.duration * 1000)">Change layout</button>
    `
})



// F8.component("header-component", {
//     template: `<h1>HEADER</h1>`
// })