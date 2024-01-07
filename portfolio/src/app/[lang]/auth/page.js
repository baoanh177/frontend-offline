"use client"
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

function AuthPage() {
    const { data: session } = useSession()
    const router = useRouter()

    if(session) {
        router.push('profile')
    }

    return <div className="p-44">
        <div className="w-[500px] rounded-xl border-2 p-5">
            <h2 className="text-3xl font-bold text-center">Login</h2>
            <div className="flex justify-center gap-6 mt-7">
                <button className="py-2 px-5 border-2 rounded-md" onClick={() => signIn('github')}>Login Github</button>
                <button className="py-2 px-5 border-2 rounded-md" onClick={() => signIn('google')}>Login Google mà chưa được</button>
            </div>
        </div>
    </div>
}

export default AuthPage;