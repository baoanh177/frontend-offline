var Component = {
    create: function(name, callback) {
        var ComponentElement = function() {
            return Reflect.construct(HTMLElement, [], ComponentElement)
        }

        ComponentElement.prototype = Object.create(HTMLElement.prototype)

        ComponentElement.prototype.connectedCallback = callback

        customElements.define(name, ComponentElement)
    }
}