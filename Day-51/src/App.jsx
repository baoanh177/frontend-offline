import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import Core from "./components/Core"
import DarkModeToggle from "./components/DarkMode"
import History from "./components/History"
import PlayTimes from "./components/PlayTimes"

function App() {
    console.log('re-render')
    const [isDarkMode, setDarkMode] = useState(false)
    const [endGame, setEndGame] = useState({
        status: false,
        isWin: false
    })
    const [playTime, setPlayTime] = useState({ maxTime: 999, remainTime: 999 })

    useEffect(() => {
        document.querySelector('body').className = isDarkMode ? "dark-mode" : "light-mode"
    }, [isDarkMode])

    return <>
        <ToastContainer/>
        <PlayTimes playTime={playTime}/>
        <DarkModeToggle isDarkMode={isDarkMode} setDarkMode={setDarkMode}/>
        <Core playTime={playTime} setPlayTime={setPlayTime} endGame={endGame} setEndGame={setEndGame}/>
        <History endGame={endGame}/>
    </>
}

export default App
