import Link from "next/link";

function SubLayout({ children }) {
    return <>
        <header className="flex h-16 px-5 justify-between items-center border-b-2 border-gray-500">
            <h1>S.TRAVEL</h1>
            <nav>
                <ul className="flex gap-5">
                    <li>
                        {/* <Link href="/" >Trang chủ</Link> */}
                    </li>
                </ul>
            </nav>
            <button>Dark mode</button>
        </header>
        <main className="p-5">{ children }</main>
    </>
}

export default SubLayout;