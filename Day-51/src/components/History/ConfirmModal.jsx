import { toast } from "react-toastify"

function ConfirmModal({setConfirmModal, setHistories}) {
    const handleDelete = () => {
        localStorage.removeItem("play-history")
        toast.success("Xóa lịch sử thành công!")
        setConfirmModal(false)
        setHistories([])
    }

    window.onkeydown = e => {
        if(e.keyCode == 27) {
            setConfirmModal(false)
        }
    }

    return (
        <div className="card">
            <div className="card-content">
                <p className="card-heading">Xóa lịch sử?</p>
                <p className="card-description">
                    Sau khi xóa không thể khôi phục, xác nhận xóa?
                </p>
            </div>
            <div className="card-button-wrapper">
                <button className="card-button secondary" onClick={() => setConfirmModal(false)}>Cancel</button>
                <button className="card-button primary" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default ConfirmModal
