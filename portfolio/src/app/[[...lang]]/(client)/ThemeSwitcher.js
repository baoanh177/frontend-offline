"use client"
import { useTheme } from "next-themes"
import Image from "next/image"
import icons from "~/assets/icons/icons"

function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()

    return (
        <>
            <Image
                src={
                    theme == "dark" ? icons.darkMode : icons.lightMode
                }
                onClick={() =>
                    setTheme(theme == "dark" ? "light" : "dark")
                }
                alt=""
            />
        </>
    )
}

export default ThemeSwitcher
