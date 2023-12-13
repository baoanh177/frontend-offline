import { memo } from "react";
import "./darkMode.css";

function DarkModeToggle({isDarkMode, setDarkMode}) {
    const handleChange = e => {
        setDarkMode(e.target.checked)
    }

    return (
        <label className="ui-switch">
            <input type="checkbox" onChange={handleChange} />
            <div className="slider">
                <div className="circle"></div>
            </div>
        </label>

    )
}

export default memo(DarkModeToggle)
