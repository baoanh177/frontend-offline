import { memo, useEffect, useRef } from "react";
import "./playtimes.css"

function PlayTimes({playTime}) {
    const rangeRef = useRef()
    const progressRef = useRef()

    useEffect(() => {
        if(rangeRef) {
            progressRef.current.style.width = 100 / +playTime.maxTime * +playTime.remainTime + '%'
        }
    }, [playTime])
    return <div className="playtimes-range" ref={rangeRef}>
        <div className="playtimes-progress" ref={progressRef}></div>
    </div>
}

export default memo(PlayTimes);