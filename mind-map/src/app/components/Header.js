"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header({children}) {
    const pathname = usePathname()

    return <>
        <header className="h-16 border-b-2 px-20 flex items-center justify-between fixed top-0 left-0 right-0 bg-white z-10">
            <div className="flex items-center gap-6">
                <h1 className="text-2xl font-bold text-green-600 whitespace-nowrap">Mindmap Flow</h1>
                <nav>
                    <ul 
                        className="
                            flex gap-3 [&>li>a]:text-[17px] [&>li>a]:py-2 [&>li>a]:px-4 [&>li>a]:whitespace-nowrap
                            hover:[&>li>a:not(.active)]:bg-gray-100 [&>li>a]:rounded-md  
                            [&>li>.active]:text-white [&>li>.active]:bg-green-600 transition
                        "
                    >
                        <li>
                            <Link href="/" className={pathname == '/' ? 'active' : ''}>Home</Link>
                        </li>
                        <li>
                            <Link href="/about" className={pathname == '/about' ? 'active' : ''}>About</Link>
                        </li>
                        <li>
                            <Link href="/features" className={pathname == '/features' ? 'active' : ''}>Features</Link>
                        </li>
                        <li>
                            <Link href="/prices" className={pathname == '/prices' ? 'active' : ''}>Prices</Link>
                        </li>
                        <li>
                            <Link href="/contact" className={pathname == '/contact' ? 'active' : ''}>Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            {children}
        </header>
    </>
}

export default Header;