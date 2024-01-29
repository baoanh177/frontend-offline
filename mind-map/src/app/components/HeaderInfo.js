import Link from 'next/link';
import { getSession } from '@auth0/nextjs-auth0';
import { postUser } from '../mindmaps/actions/handlePostUser';
import { handleCreateInitDat } from '../mindmaps/actions/handleCreateInitData'

async function HeaderInfo() {
    let user
    const data = await getSession()

    if(data) {
        const { sub, name, picture } = data.user
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/users/${sub}`)
        if(response.ok) {
            user = await response.json()
        }
        if(!user) {
            await postUser({ id: sub, name, picture, email: data.user?.email || "" })
            await handleCreateInitDat(sub)
        }
    }
    
    return <>
        <div className="flex items-center gap-3 [&>a]:text-[17px] [&>a]:py-2 [&>a]:px-4 [&>a]:rounded-md [&>a]:whitespace-nowrap">
            {user ?
            <>
                <div className='whitespace-nowrap'>
                    Hi,<Link href="/profile" className="hover:text-green-600 cursor-pointer"> {user.name}</Link>
                </div>
                <Link href="/mindmaps" className="hover:text-green-600 cursor-pointer">Mindmap</Link>
                <Link 
                    href="/api/auth/logout" 
                    className="bg-transparent text-black border-[1px] border-green-600 cursor-pointer 
                    text-sm hover:bg-green-600 hover:text-white transition"
                >Logout</Link>
            </>
            :
            <>
                <Link href="/api/auth/login" className="hover:text-green-600 cursor-pointer">Login</Link>
                <Link href="/api/auth/login" className="bg-green-600 text-white cursor-pointer">Register</Link>
            </>
            }
        </div>
    </>
}

export default HeaderInfo;