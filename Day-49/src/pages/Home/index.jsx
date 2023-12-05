import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../store/Provider";
import { client } from "../../config/client";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";

function Home() {
    const cartProducts = JSON.parse(localStorage.getItem("cart"))
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState(cartProducts || [])
    const { setLoading } = useContext(GlobalContext)
    
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])
    
    useEffect(() => {
        setLoading(true)
        client.get("/products?limit=8").then(res => {
            setProducts(res.data.data.listProduct)
            setLoading(false)
        })
    }, [])
    return <>
        <ProductList products={products} cart={cart} setCart={setCart} />
        <Cart cart={cart} setCart={setCart} />
    </>
}

export default Home;