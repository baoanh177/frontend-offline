class F8 {
    static component = (name, props) => {
        customElements.define(name, class extends HTMLElement {
            constructor() {
                super()
                this.innerHTML = props.template
                const changeNodes = []

                if(props.data) {
                    const data = props.data()
                    Object.keys(data).forEach(key => {
                        window[key] = data[key]
                    })
                }

                this.render = () => {
                    for(const node of changeNodes) {
                        const textNode = node.text.match(/{{.+?}}/)
                        const variable = textNode[0].replaceAll('{', '').replaceAll('}', '').trim()
                        const replaceText = textNode.input.replaceAll(textNode[0], eval(variable))
                        if(replaceText != node.element.innerText) {
                            node.element.innerText = replaceText
                        }
                    }
                }
                
                
                for(const element of this.children) {
                    if(element.innerText.match(/{{.+?}}/g)) {
                        console.log(element.childNodes)
                        changeNodes.push({
                            element,
                            text: element.childNodes[0].data
                        })
                    }
                    
                    // Event
                    for(const att of element.attributes) {
                        if(att.localName.includes('v-on:')) {
                            const event = att.localName.split("v-on:").at(1)
                            const action = att.value
                            element.addEventListener(event, () => {
                                eval(action)
                                this.render()
                            })
                        }
                    }
                    console.warn("End")
                }
                // this.render()
            }
        })
    }
}