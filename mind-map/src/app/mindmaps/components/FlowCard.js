"use client"
import Image from "next/image"
import { images } from "~/assets/images/images";
import clsx from "clsx";
import { useRouter } from "next/navigation"
import { useState } from "react"
import { getDate } from "../helpers/getDate"

function FlowCard({ id, title, created_at, isPublic }) {
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)

    const handleRedirect = () => {
        router.push(`/mindmaps/${id}`)
        setLoading(true)
    }
    
    return <>
        <li className="relative w-52 rounded-lg h-full border-2 [&>.overlay]:hover:opacity-100 [&>.overlay]:hover:visible overflow-hidden">
            <div
                onClick={handleRedirect}
                className="overlay invisible opacity-0 absolute inset-0 bg-black bg-opacity-5 transition cursor-pointer z-10"
            >
                
            </div>
            <div className="h-3/4 border-b-2 relative">
                {isLoading && 
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent"></div>
                    </div>
                }
                <Image src={images.mindmapDesc} alt="" priority className="h-full w-full object-cover" />
            </div>
            <div className="px-2 pt-1">
                <span className="text-sm font-bold">{title}</span>
                <div className="flex gap-2 items-center justify-between">
                    <span className="text-xs">{getDate(created_at)}</span>
                    <div className="flex items-center gap-1">
                        <span className={
                            clsx("inline-block w-[10px] h-[10px] rounded-[50%]", 
                            isPublic ? "bg-green-400" : "bg-yellow-600")
                        }></span>
                        <span className="text-xs">{isPublic ? 'Public' : 'Private'}</span>
                    </div>
                </div>
            </div>
        </li>
    </>
}

export default FlowCard;