import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Cart from "../pages/cart";
import Home from "../pages/home";
import ProductDetail from "../pages/productDetail";
import NotFound from "../pages/error/NotFound";

const handleLayout = (Component) => {
    const Layout = Component.props.layout
    if(Layout == false) {
        return Component
    }else if(typeof Layout == 'function') {
        return <Layout>{Component}</Layout>
    }
    
    return <DefaultLayout>{Component}</DefaultLayout>
}

const router = createBrowserRouter([
    {
        path: "/",
        element: handleLayout(<Home />)
    },
    {
        path: "/cart",
        element: handleLayout(<Cart />)
    },
    {
        path: "/product-detail/:id",
        element: handleLayout(<ProductDetail />)
    },
    {
        path: "*",
        element: handleLayout(<NotFound />)
    }
])

export { router }