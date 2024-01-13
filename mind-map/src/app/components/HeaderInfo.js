import Link from 'next/link';
import { getSession } from '@auth0/nextjs-auth0';

async function HeaderInfo() {
    const data = await getSession()

    const user = data?.user

    return <>
        <div className="flex items-center gap-3 [&>a]:text-[17px] [&>a]:py-2 [&>a]:px-4 [&>a]:rounded-md [&>a]:whitespace-nowrap">
            {user ?
            <>
                <div>
                    Hi,<Link href="/profile" className="hover:text-green-600 cursor-pointer"> {user.name}</Link>
                </div>
                <Link href="/mindmaps" className="hover:text-green-600 cursor-pointer">Mindmap</Link>
                <Link 
                    href="/api/auth/logout" 
                    className="bg-transparent text-black border-[1px] border-green-600 cursor-pointer 
                    text-sm hover:bg-green-600 hover:text-white transition"
                >Đăng xuất</Link>
            </>
            :
            <>
                <Link href="/api/auth/login" className="hover:text-green-600 cursor-pointer">Đăng nhập</Link>
                <Link href="/api/auth/login" className="bg-green-600 text-white cursor-pointer">Đăng kí</Link>
            </>
            }
        </div>
    </>
}

export default HeaderInfo;