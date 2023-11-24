import { router } from "./Utils/router";
import { handleRoute } from "./Utils/router";
import DefaultLayout from "./Layouts/Default";
import Home from "./pages/Home"
import About from "./pages/About"
import Product from "./pages/Product"
import ProductDetail from "./pages/ProductDetail";

function App() {

    return handleRoute([
        {
            path: "/",
            component: Home
        },
        {
            path: "/about",
            component: About
        },
        {
            path: "/product",
            component: Product
        },
        {
            path: "/product-detail/:id",
            component: ProductDetail
        }
    ], DefaultLayout)
}

export default App;