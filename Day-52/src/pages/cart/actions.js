import { toast } from "react-toastify"
import { store } from "../../redux/store"

const handleDelete = (id) => {
    toast.warn("Chắc chắn muốn xóa sản phẩm? Click here to xóa!", {
        onClick: () => {
            store.dispatch({
                type: 'cart/delete',
                payload: id
            })
            toast.success("Xóa sản phẩm thành công!")
        }
    })
}

const handleDecrement = (id, quantity) => {
    if(quantity > 1) {
        store.dispatch({
            type: 'cart/decrement',
            payload: id
        })
    }else {
        handleDelete(id)
    }
}
const handleIncrement = (id) => {
    store.dispatch({
        type: 'cart/increment',
        payload: id
    })
}

const handleCheckout = () => {
    store.dispatch({
        type: 'cart/checkout'
    })
    toast.success("Thank you!")
}

export { handleDelete, handleIncrement, handleDecrement, handleCheckout }