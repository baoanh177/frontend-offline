import { useContext } from "react";
import { client } from "../../../config/client";
import { GlobalContext } from "../../../store/Provider";
import { toast } from "react-toastify";

function Cart({cart, setCart, products, setProducts}) {
    const { setLoading } = useContext(GlobalContext)

    const handlePay = () => {
        const cartProducts = cart.map(product => {
            return {
                productId: product.productId,
                quantity: product.quantity
            }
        })

        if(cartProducts.length > 0) {
            let isValid = true
            for(const product of cartProducts) {
                if(product.quantity >= 1000) {
                    toast.error("Số lượng không được vượt quá 1000")
                    isValid = false
                    break
                }
            }
            if(isValid) {
                setLoading(true)
                client.post("/orders", cartProducts).then(res => {
                    if(res.response.ok) {
                        for(const index in products) {
                            for(const product of cartProducts) {
                                if(products[index]._id == product.productId) {
                                    products[index].quantity -= product.quantity
                                }
                            }
                        }
                        localStorage.removeItem("cart")
                        setProducts([...products])
                        setCart([])
                        setLoading(false)
                        toast.success("Thanh toán thành công")
                    }
                })
            }
        }
    }

    return <li className="card" style={{marginTop: '20px'}}>
        <div className="card-img">
            <b>Giỏ hàng</b>
        </div>
        <div className="card-subtitle">{}</div>
        <hr className="card-divider" />
        <div className="card-footer">
            {cart.length ? <table className="cart-table">
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Còn lại</th>
                        <th>Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((product, index) => {
                        return <tr key={index}>
                            <td><b>{product.name}</b></td>
                            <td>{product.quantity}</td>
                            <td>{product.left}</td>
                            <td>{product.quantity * product.price}</td>
                        </tr>
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <button
                                className="card-btn"
                                onClick={handlePay}
                            >Thanh toán</button>
                        </td>
                    </tr>
                </tfoot>
            </table> : <b>Giỏ hàng trống</b>}
        </div>
    </li>
    }

export default Cart;