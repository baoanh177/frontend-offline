import Navigo from "navigo"
import Error from "../Error"

const router = new Navigo("/", { linksSelector: "a" })
const root = document.querySelector("#app")

window.navigate = function(path) {
    router.navigate(path)
}

function handleRoute(routes, DefaultLayout) {
    
    root.innerHTML = DefaultLayout()
    routes.forEach(route => {
        router.on(route.path, function(params) {
            root.innerHTML = DefaultLayout().replace("{body}", route.component(params))
        })
    })
    router.notFound(function() {
        root.innerHTML = Error()
    })
    router.resolve()
}


export { handleRoute, router }
