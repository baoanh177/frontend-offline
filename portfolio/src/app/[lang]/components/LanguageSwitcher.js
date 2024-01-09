"use client"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

function LanguageSwitcher({ lang }) {
    const router = useRouter()
    const pathname = usePathname()
    
    // useEffect(() => {
    //     const savedLang = document.cookie || ''
    //     const langName = savedLang.split('=')[1] 
    //     if(langName && langName == 'en' || langName == 'vi') {
    //         const nextPath = pathname.split('/').map(e => {
    //             if(e == 'en' || e == 'vi') {
    //                 return langName
    //             }
    //             return e
    //         }).join('/')
    //         router.push(nextPath)
    //     }else {
    //         document.cookie = `lang=${lang}`
    //     }
    // }, [])

    const handleSwitchLang = () => {
        const nextLang = lang == 'en' ? 'vi' : 'en'
        document.cookie = `lang=${nextLang}`
        
        const nextPath = pathname.split('/').map(e => {
            if(e == 'en' || e == 'vi') {
                return nextLang
            }
            return e
        }).join('/')

        router.push(nextPath)
    }

    return <>
        <button
            onClick={handleSwitchLang} 
            className="h-8 w-16 bg-gray-400 bg-opacity-50 rounded-lg"
        >
            {lang == 'en' ? 'vi' : 'en'}
        </button>
    </>
}

export default LanguageSwitcher