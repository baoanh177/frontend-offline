"use client"
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function ProfilePage() {
    const { data: session } = useSession()

    if(!session) {
        redirect('/vi/auth')
    }

    const isGithubAccount = session?.user?.image.startsWith('https://avatars.githubusercontent.com')

    return <div className="flex flex-col gap-5 py-5">
        <div className="flex items-center gap-3">
            <img src={session?.user?.image} alt="" className="w-9 h-9 rounded-[50%] bg-green-700"/>
            <div className="flex flex-col">
                <span className="text-sm">{session?.user?.name}</span>
                <span className="text-xs">{session?.user?.email}</span>
            </div>
        </div>
        <hr/>
        <div className="flex justify-between">
            <div className="w-60 h-10 rounded-xl flex overflow-hidden">
                <div className="w-1/2 h-full bg-green-500 flex items-center justify-center">
                    {isGithubAccount ? session?.user?.name : 'Github'}
                </div>
                <div className="w-1/2 h-full bg-blue-500 flex items-center justify-center">Google</div>
            </div>
            <div className="w-60 h-10 rounded-xl flex hover:cursor-pointer">
                <div 
                    className="w-3/5 h-full border-2 bg-transparent border-orange-500 
                    flex items-center justify-center rounded-l-xl"
                >Sửa thông tin</div>
                <div className="w-2/5 h-full bg-red-500 flex items-center justify-center rounded-r-xl"
                    onClick={() => signOut()}
                >Đăng xuất</div>
            </div>
        </div>
        <hr/>
        <div>
            <span className="text-3xl font-bold">Bài viết đã xem</span>
            <div className="text-center mt-5">
                <span className="text-xl">:( Bạn chưa xem bài viết nào</span>
            </div>
        </div>
        <hr/>
        <div>
            <span className="text-3xl font-bold">Comment đã đăng</span>
            <div className="text-center mt-5">
                <span className="text-xl">:( Bạn chưa đăng comment nào</span>
            </div>
        </div>
    </div>
}

export default ProfilePage;