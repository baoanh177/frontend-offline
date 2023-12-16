import { memo } from "react"
import { handleDelete, handleIncrement, handleDecrement } from "./actions"
import DelButton from "./DelButton"

function CartItem({ id, image, brand, name, price, left, quantity }) {
    
    return (
        <li className="card cart-item">
            <div className="cart-thumb">
                <img src={image} className="cart-image" alt="" />
            </div>
            <div className="cart-info">
                <div className="brand">{brand}</div>
                <div className="product-name">{name}</div>
                <div className="price">{price.toLocaleString('vi-VN')}đ</div>
                <div className="left">Còn lại: {left - quantity}</div>
            </div>
            <div className="quantity">
                <button onClick={() => handleDecrement(id, quantity)}>-</button>
                <div>{quantity}</div>
                <button onClick={() => handleIncrement(id)}>+</button>
            </div>
            <div className="total">{(price * quantity).toLocaleString('vi-VN')}đ</div>
            <DelButton onDelete={() => handleDelete(id)}/>
        </li>
    )
}

export default memo(CartItem)
