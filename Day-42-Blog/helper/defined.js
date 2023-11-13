export default function definedPrototype() {
    HTMLElement.prototype.disabled = function(value = true) {
        const submitBtn = this.querySelector("button")
        if(submitBtn) {
            if(typeof value == "boolean") {
                submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`
                submitBtn.disabled = true
            }else if(typeof value == "string") {
                submitBtn.innerHTML = value
                submitBtn.disabled = false
            }
        }
    }
}