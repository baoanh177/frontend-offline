import { memo, useEffect, useRef, useState } from "react"
import "./history.css"
import ConfirmModal from "./ConfirmModal"

function History({endGame}) {
    const [histories, setHistories] = useState([])
    const [confirmModal, setConfirmModal] = useState(false)
    const listRef = useRef()
    const tableRef = useRef()

    useEffect(() => {
        const playHistory = JSON.parse(localStorage.getItem('play-history')) || []
        setHistories(playHistory)
    }, [endGame])

    // window.onkeydown = e => {
    //     if(e.keyCode == 37) {
    //         listRef.current.style.transform = `translateX(${tableRef.current.offsetWidth + 'px'})`
    //     }else if(e.keyCode == 39) {
    //         listRef.current.style.transform = `translateX(-${tableRef.current.offsetWidth + 'px'})`
    //         console.log(listRef.current.style)
    //     }
    // }

    return (
        <div>
            {confirmModal && <ConfirmModal setConfirmModal={setConfirmModal} setHistories={setHistories}/>}
            {confirmModal && <div className="overlay" onClick={() => setConfirmModal(false)}></div>}
            {histories.length > 0 && <div className="row">
                <button className="delete-history-btn" onClick={() => setConfirmModal(true)}>Xóa</button>
            </div>}
            <div className="histories" ref={listRef}>
                {histories && histories.reverse().map((history, index) =>
                    <table key={index} className="play-history" ref={tableRef}>
                        <thead>
                            <tr>
                                <th>Lần chọn thứ</th>
                                <th>Số đã chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history && history.map((his, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td style={{color: his.isCorrect ? 'green' : 'red'}}>{his.number}</td>
                                </tr>    
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan={2}><hr />Lần chơi thứ {histories.length - index}/{histories.length}</th>
                            </tr>
                            <tr>
                                <th colSpan={2}>Số lần nhập tối đa {history[0] && history[0].maxTime}</th>
                            </tr>
                            <tr>
                                <th colSpan={2}>Tỉ lệ đúng 33,33%</th>
                            </tr>
                        </tfoot>
                    </table>    
                )}
            </div>
        </div>
    )
}

export default memo(History)
