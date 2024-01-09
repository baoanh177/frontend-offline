"use client"
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

function AuthPage() {
    const { data: session } = useSession()
    const pathname = usePathname()

    if(session) {
        redirect(`/`)
    }
    console.log(pathname)

    return <div className="p-44 flex justify-center">
        <div className="w-[500px] rounded-xl border-2 p-5">
            <h2 className="text-3xl font-bold text-center">Login</h2>
            <div className="flex justify-center gap-6 mt-7">
                <button className="py-2 px-5 border-2 rounded-md" onClick={() => signIn('github')}>Github</button>
                <button className="py-2 px-5 border-2 rounded-md" onClick={() => signIn('google')}>Google</button>
            </div>
        </div>
    </div>
}

export default AuthPage;