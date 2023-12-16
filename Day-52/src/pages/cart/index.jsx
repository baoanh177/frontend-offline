import { memo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import empty_cart from "../../assets/images/empty_cart-2.png"

function Cart() {
    const products = useSelector(state => state.cart)

    return <div className="cart-container">
        <div className="products">
            {products.length ?
            products.map(product => <CartItem key={product.id} {...product} />) :
            <img src={empty_cart} alt="" />
            }
        </div>
        <div className="right-cart">
            {products.length > 0 && <Checkout products={products} />}
            <Link to="/">
                <button className="home-btn">Home</button>
            </Link>
        </div>
    </div>
}

export default memo(Cart);