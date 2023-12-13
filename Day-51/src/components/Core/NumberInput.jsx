import { memo, useEffect, useRef, useState } from "react";
import { numberValidate } from "./handlers/handleValidate";
import { handleCheckNum } from "./handlers/handleCheckNum";
import { toast } from "react-toastify";

function NumberInput({
    playTime,
    setPlayTime,
    toNum, 
    winNumber, 
    history, 
    setHistory, 
    setMessage
}) {
    const [inputValue, setInputValue] = useState({prevValue: [], currentValue: ''})
    const inputRef = useRef()

    useEffect(() => {
        setInputValue({prevValue: [], currentValue: ''})
    }, [toNum])
    
    const handleSubmit = e => {
        e.preventDefault()
        const { isValid, isCorrect, message } = handleCheckNum(inputValue, winNumber)
        if(isValid) {
            setHistory([...history, {
                number: inputValue.currentValue,
                isCorrect,
                maxTime: playTime.maxTime
            }])
            message && setMessage(message)
            setPlayTime({...playTime, remainTime: --playTime.remainTime})
            setInputValue({prevValue: [...inputValue.prevValue, inputValue.currentValue], currentValue: ''})
            if(isCorrect) {
                setPlayTime({...playTime, remainTime: 0})
            }
        }
    }

    window.onkeydown = e => {
        if(e.keyCode == 40) {
            if(inputValue.currentValue > 1) {
                setInputValue({...inputValue, currentValue: --inputValue.currentValue})
            }else {
                toast.warn(`Vui lòng nhập số từ 1 đến ${toNum}`)
            }
        }else if(e.keyCode == 38) {
            if(inputValue.currentValue < toNum) {
                setInputValue({...inputValue, currentValue: ++inputValue.currentValue})
            }else {
                toast.warn(`Vui lòng nhập số từ 1 đến ${toNum}`)
            }
        }else if(Number.isInteger(+e.key)) {
            inputRef.current.focus()
        }
    }

    const handleChange = e => {
        const result = numberValidate({...inputValue, currentValue: e.target.value}, toNum)
        result == '' && setInputValue(result) || result && setInputValue(result)
    }

    return <form className="number-form" onSubmit={handleSubmit}>
        <div>
            <span>Hãy thử nhập một số</span>
        </div>
        <input
            ref={inputRef}
            type="text"
            className="input"
            placeholder={inputValue.prevValue.length ? inputValue.prevValue[inputValue.prevValue.length - 1] : "Thử một số"}
            value={inputValue.currentValue}
            onChange={handleChange}
        />
    </form>
}

export default memo(NumberInput);