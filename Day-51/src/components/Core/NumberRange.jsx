import { useRef, useState, useEffect, memo } from "react"
import "./core.css"
import { handleProgress } from "./handlers/handleProgress"

function NumberRange({playTime, toNum, setToNum, message}) { 
    const [left, setLeft] = useState(toNum / 2048 * 100)
    const [drag, setDrag] = useState(false)
    const flagsRef = useRef()
    const currenNumRef = useRef()

    useEffect(() => {
        setLeft(toNum / 2048 * 100)
        currenNumRef.current.innerText = toNum
    }, [toNum])

    const handleMouseDown = e => {
        const {num, percent} = handleProgress(e)
        setDrag(true)
        setLeft(percent)
        currenNumRef.current.innerText = Math.ceil(num)
    }

    window.onmousemove = e => {
        if(drag) {
            const {num, percent} = handleProgress(e)
            setLeft(percent)
            currenNumRef.current.innerText = Math.ceil(num)
        }
    }
    window.onmouseup = (e) => {
        if(drag) {
            setDrag(false)
            const {num, percent} = handleProgress(e)
            setToNum(Math.ceil(num))
        }
    }

    return (
        <div className="number-range">  
            <div className="message">
                <span>{message ? message : "Chào mừng bạn đến với trò chơi đoán số!"}</span>
            </div>
            <div className="remain-times">
                Còn <span>{playTime.remainTime}/{playTime.maxTime} lượt chơi</span>
            </div>
            <div className="rule">
                Bạn cần tìm kiếm một số từ 1 đến {toNum}
            </div>

            <div
                className="range"
                onMouseDown={handleMouseDown}
            >
                <div
                    className="progress"
                    style={{
                        width: left + '%'
                    }}
               >
                    <div className="dot"></div>
                    <div className="current-number" ref={currenNumRef}>100</div>
                </div>
                <div ref={flagsRef} className="flags">
                    <div className="flag" style={{marginLeft: 100 / 2048 * 100+ '%'}}>100</div>
                    <div className="flag">2048</div>
                </div>
            </div>
        </div>
    )
}

export default memo(NumberRange)
