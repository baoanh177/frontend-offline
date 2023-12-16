import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { client } from "../../config/client";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ProductDetail() {
    const [product, setProduct] = useState()
    const navigate = useNavigate()
    const {id} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        client.get("/products/" + id).then(res => {
            if(res.response.ok) {
                setProduct(res.data.data)
            }else {
                navigate("/not-found")
            }
        })
    }, [])

    const handleAddToCart = () => {
        dispatch({
            type: 'cart/add',
            payload: {
                id: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                brand: product.brand,
                quantity: 1,
                left: --product.quantity,
            }
        })
        toast.success("Thêm sản phẩm thành công!")
    }

    return <>
        {product &&
            <div className="detail-container card">
                <div className="product-thumb">
                    <img src={product.image} alt="" />
                </div>
                <div className="product-info">
                    <span className="brand-name">VNG</span>
                    <h1 className="product-name">{product.name}</h1>
                    <span className="product-price">{product.price.toLocaleString('vi-VN')}đ</span>
                    <p>{product.description}</p>
                    <span><b>Category:</b> {product.category}</span>
                    <div className="actions">
                        <button 
                            className="add-to-cart"
                            onClick={handleAddToCart}
                        >Add to cart</button>
                        <Link to="/">
                            <button className="go-home">Go Home</button>
                        </Link>
                    </div>
                </div>
            </div>
        }
    </>
}

export default ProductDetail;