"use client"
import { useTheme } from "next-themes"
import Link from "next/link"
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
                <h1 className=""><Link href="/">S.TRAVEL</Link></h1>
                <nav>
                    <ul className="flex gap-5">
                        <li>
                            <Link href="/">Trang chủ</Link>
                        </li>
                        <li>
                            <a href="#about">About</a>
                        </li>
                        <li>
                            <a href="#diem-den">Điểm đến</a>
                        </li>
                        <li>
                            <Link href="/#dich-vu">Dịch Vụ</Link>
                        </li>
                        <li>
                            <a href="#anh">Ảnh</a>
                        </li>
                        <li>
                            <a href="#blogs">Blogs</a>
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
