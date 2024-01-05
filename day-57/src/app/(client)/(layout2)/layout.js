"use client"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

function DetailLayout({ children }) {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const pathname = usePathname()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className={theme}>
            <header className="z-10 flex h-16 px-5 justify-between items-center dark:bg-black bg-white border-b-2 border-gray-500 fixed top-0 left-0 right-0">
                <h1 className="">S.TRAVEL</h1>
                <nav>
                    <ul className="flex gap-5">
                        <li>
                            <Link href="/" className={pathname == "/"? 'text-green-500' : ''}>Trang chủ</Link>
                        </li>
                        <li>
                            <Link href="/book" className={pathname == "/book"? 'text-green-500' : ''}>Đặt lịch</Link>
                        </li>
                        <li>
                            <Link href="/uudai" className={pathname == "/uudai"? 'text-green-500' : ''}>Ưu Đãi</Link>
                        </li>
                        <li>
                            <Link href="/services" className={pathname == "/services"? 'text-green-500' : ''}>Dịch Vụ</Link>
                        </li>
                        <li>
                            <Link href="/danhgia" className={pathname == "/danhgia"? 'text-green-500' : ''}>Đánh Giá</Link>
                        </li>
                        <li>
                            <Link href="/contact" className={pathname == "/contact"? 'text-green-500' : ''}>Liên Hệ</Link>
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
            <main className="mt-[63px] px-8">{children}</main>
        </div>
    )
}

export default DetailLayout
