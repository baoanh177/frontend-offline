import { memo } from "react"
import { store } from "../../redux/store"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

function ProductCard({_id, image, name, price, brand, quantity}) {

    const handleClick = () => {
        store.dispatch({
            type: 'cart/add',
            payload: {
                id: _id,
                name,
                image,
                price,
                brand,
                quantity: 1,
                left: --quantity,
            }
        })
        toast.success("Thêm sản phẩm thành công!")
    }

    return (
        <li className="card">
            <div className="card-img">
                <Link to={"/product-detail/" + _id}>
                    <img src={image} alt="" />
                </Link>
            </div>
            <div className="card-title">{name}</div>
            <hr className="card-divider" />
            <div className="card-footer">
                <div className="card-price">
                    <span>{price.toLocaleString('vi-VN')}đ</span>
                </div>
                <button
                    className="card-btn"
                    onClick={handleClick}
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

export default memo(ProductCard)
