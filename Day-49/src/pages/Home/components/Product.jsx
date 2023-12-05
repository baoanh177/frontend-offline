import { toast } from "react-toastify"

function Product({ _id, name, price, image, quantity, cart, setCart }) {

    const handleAddToCart = id => {
        if(cart.length == 0) {
            const product = {
                productId: id,
                name,
                price,
                quantity: 1,
                left: quantity - 1
            }

            setCart([product])
        }else {
            let isExist = false
            for(const index in cart) {
                if(cart[index].productId == id) {
                    cart[index].quantity += 1
                    cart[index].left = quantity - cart[index].quantity
                    isExist = true
                    setCart([...cart])
                    break
                }
            }
            if(!isExist) {
                const product = {
                    productId: id,
                    name,
                    price,
                    quantity: 1,
                    left: quantity - 1
                }
                setCart([...cart, product])
            }
        }
        toast.success("Đã thêm một sản phẩm vào giỏ hàng")
    }

    return (
        <li className="card">
            <div className="card-img">
                <img src={image} alt="" />
            </div>
            <div className="card-title">{name}</div>
            <div className="card-subtitle">{}</div>
            <hr className="card-divider" />
            <div className="card-footer">
                <div className="card-price">
                    <span>$</span> {price}
                </div>
                <button
                    className="card-btn"
                    onClick={() => handleAddToCart(_id)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z"></path>
                        <path d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
                        <path d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
                        <path d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z"></path>
                    </svg>
                </button>
            </div>
        </li>
    )
}

export default Product
