import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import logo from "../assets/images/logo.png"

function DefaultLayout({ children }) {
    const products = useSelector(state => state.cart)

    return <>
        <header className="header">
            <div className="logo">
                <a href="/">
                    <img src={logo} alt="" />
                </a>
            </div>
            <Link to="/cart">
                <button data-quantity={products.length} className="btn-cart">
                    <svg
                        className="icon-cart"
                        viewBox="0 0 24.38 30.52"
                        height="30.52"
                        width="24.38"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>icon-cart</title>
                        <path
                            transform="translate(-3.62 -0.85)"
                            d="M28,27.3,26.24,7.51a.75.75,0,0,0-.76-.69h-3.7a6,6,0,0,0-12,0H6.13a.76.76,0,0,0-.76.69L3.62,27.3v.07a4.29,4.29,0,0,0,4.52,4H23.48a4.29,4.29,0,0,0,4.52-4ZM15.81,2.37a4.47,4.47,0,0,1,4.46,4.45H11.35a4.47,4.47,0,0,1,4.46-4.45Zm7.67,27.48H8.13a2.79,2.79,0,0,1-3-2.45L6.83,8.34h3V11a.76.76,0,0,0,1.52,0V8.34h8.92V11a.76.76,0,0,0,1.52,0V8.34h3L26.48,27.4a2.79,2.79,0,0,1-3,2.44Zm0,0"
                        ></path>
                    </svg>
                    <span className="quantity"></span>
                </button>
            </Link>
        </header>
        <div className="container">
            {children}
        </div>
    </>
}

export default DefaultLayout
