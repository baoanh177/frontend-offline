import Product from "./Product";

function ProductList({ products, cart, setCart }) {
    return <div className="list-product">
        {products.map((product, index) => {
            return <Product key={index} cart={cart} setCart={setCart} {...product} />
        })}
    </div>
}

export default ProductList;