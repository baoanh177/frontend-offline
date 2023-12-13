import { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";

import NumberInput from "./NumberInput";
import NumberRange from "./NumberRange";

function Core({playTime, setPlayTime, endGame, setEndGame}) {
    const [toNum, setToNum] = useState(100)
    const [message, setMessage] = useState('')
    const [history, setHistory] = useState([])
    const [winNumber, setWinNumber] = useState(Math.ceil(Math.random() * toNum))

    const handleReset = () => {
        setWinNumber(Math.ceil(Math.random() * toNum))
        const maxTime = Math.ceil(Math.log2(toNum))
        setPlayTime({maxTime, remainTime: maxTime})
        setHistory([])
        setMessage("Chào mừng bạn đến với trò chơi đoán số!")
        setEndGame({status: false, isWin: false})
    }

    const handleRestart = () => {
        setToNum(100)
        handleReset()
    }

    console.log(endGame)
    useEffect(() => {
        if(endGame.status) {
            const histories = JSON.parse(localStorage.getItem('play-history')) || []
            localStorage.setItem('play-history', JSON.stringify([...histories, history]))
            if(!endGame.isWin) {
                setMessage(message.indexOf('cần') > 0 ?
                `Đáng lẽ bạn nên ${message.slice(message.indexOf('cần') + 4)}` :
                "Chúc mừng bạn đã trả lời đúng, bạn là nhất, bạn là số 1!"
                )
            }
        }
    }, [endGame])

    useEffect(() => {
        handleReset()
        toast("Chào mừng bạn đến với trò chơi đoán số")
    }, [toNum])

    useEffect(() => {
        if(playTime.remainTime == 0) {
            setEndGame({
                ...endGame,
                status: playTime.remainTime == 0
            })
        }
    }, [playTime.remainTime])

    return <>
        <NumberRange
            playTime={playTime}
            setPlayTime={setPlayTime}
            toNum={toNum}
            setToNum={setToNum}
            message={message}
        />
        {endGame.status ?
        <button className="restart-btn" onClick={handleRestart}>Chơi lại</button> :
        <NumberInput
            playTime={playTime}
            toNum={toNum}
            winNumber={winNumber}
            setPlayTime={setPlayTime}
            history={history}
            setHistory={setHistory}
            setMessage={setMessage}
            setEndGame={setEndGame}
        />}
    </>
}

export default memo(Core);