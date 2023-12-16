import { memo, useCallback } from "react"
import { handleCheckout } from "./actions"

function Checkout({ products}) {

    const getTotal = useCallback((products, type) => {
        return products.reduce((acc, cur) => {
            return type == 'quantity' ? 
            acc += cur.quantity : 
            acc += cur.price * cur.quantity
        }, 0)
    }, [products])

    return (
        <div className="checkout card">
            <div className="title">Checkout</div>
            <div className="detail">
                <div>Sản phẩm:</div>
                <ul>
                    {products.map((product, index) => <li key={index}>{product.name}</li>)}
                </ul>
                <div>Tổng số sản phẩm: {getTotal(products, 'quantity')}</div>
                <div>Thành tiền: {getTotal(products).toLocaleString('vi-VN')}đ</div>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
        </div>
    )
}

export default memo(Checkout)
