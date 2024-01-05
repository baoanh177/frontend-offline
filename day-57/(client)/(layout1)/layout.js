"use client"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

function HomeLayout({ children }) {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <>
            <header className="flex h-16 px-5 justify-between items-center border-b-2 border-gray-500 fixed top-0 left-0 right-0">
                <h1 className="">S.TRAVEL</h1>
                <nav>
                    <ul className="flex gap-5">
                        <li>
                            <a href="#">Trang chủ</a>
                        </li>
                        <li>
                            <a href="#dat-lich">Đặt lịch</a>
                        </li>
                        <li>
                            <a href="#uu-dai">Ưu Đãi</a>
                        </li>
                        <li>
                            <a href="#dich-vu">Dịch Vụ</a>
                        </li>
                        <li>
                            <a href="#danh-gia">Đánh Giá</a>
                        </li>
                        <li>
                            <a href="#lien-he">Liên Hệ</a>
                        </li>
                    </ul>
                </nav>
                <button
                    onClick={() =>
                        setTheme(theme == "dark" ? "light" : "dark")
                    }
                >
                    {theme == "light" ? "Dark mode" : "Light mode"}
                </button>
            </header>
            <main className="p-5 mt-24">{children}</main>
        </>
    )
}

export default HomeLayout
