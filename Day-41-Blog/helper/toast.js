export default function showToast({
    title = '',
    message = '',
    type = 'success',
    duration = 3000
}) {
    const main = document.querySelector('#toast')
    if(main) {
        const toast = document.createElement('div')
        const icons = {
            success: 'fa-solid fa-circle-check',
            error: 'fa-sharp fa-solid fa-circle-exclamation'
        }
        const delay = (duration / 1000).toFixed(2)
        const icon = icons[type]

        toast.classList.add('toast',`toast--${type.toLowerCase()}`)
        toast.style.animation = `slideToLeft ease .3s, fadeOut 1s ${delay}s forwards`
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="content">
                <div class="toast__title">${title}</div>
                <span class="toast__desc">${message}</span>
            </div>
            `
        main.appendChild(toast)


        const autoRemoveId = setTimeout(function() {
            main.removeChild(toast)
        }, duration + 1000)

        // main.onclick = function(e) {
        //     if(e.target.closest('.toast__close')) {
        //         main.removeChild(toast)
        //         clearTimeout(autoRemoveId)
        //     }
        // }
    }
}
