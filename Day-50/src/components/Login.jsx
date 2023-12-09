import { useAuth0 } from "@auth0/auth0-react"

function Login() {
    const { loginWithPopup } = useAuth0()

    return <div className="login-block">
        <span>Cảm ơn bạn đã sử dụng dịch vụ của F8</span>
        <span>Nếu có bất kỳ câu hỏi hay trợ giúp nào, hãy đăng nhập và đặt câu hỏi tại đây!</span>
        <button className="login-btn" onClick={() => loginWithPopup()}>Đăng nhập || Đăng ký</button>
    </div>;
}

export default Login;