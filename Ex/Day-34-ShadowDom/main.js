const F8 = {
    component: function (name, options = {}) {
        var templateHtml = options.template
        if (templateHtml) {
            Component.create(name, function () {
                var template = document.createElement("template")
                template.innerHTML = templateHtml
                
                var templateNode = template.content.cloneNode(true)

                Array.from(templateNode.children).forEach(element => {
                    if(element.getAttribute('v-length')) {
                        const length = element.getAttribute('v-length')
                        for(let index = 0; index < length; index++) {
                            const elementClone = element.cloneNode(true)
                            elementClone.innerHTML = elementClone.innerHTML.replaceAll('{index}', index)
                            templateNode.insertBefore(elementClone, elementClone.nextElementSibling)
                        }
                    }
                    templateNode.children[0].remove()
                })
                this.append(templateNode)
            })
        }
    }
}

F8.component("counter-app", {
    template: `<h1 v-length="5">Count: {index}</h1>`
})
