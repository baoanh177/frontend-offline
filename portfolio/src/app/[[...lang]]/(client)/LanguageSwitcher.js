"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

function LanguageSwitcher({ lang }) {
    const router = useRouter()
    
    // useEffect(() => {
    //     const savedLang = document.cookie || ''
    //     const langName = savedLang.split('=')[1] 
    //     if(langName && langName == 'en' || langName == 'vi') {
    //         router.push(langName)
    //     }
    // }, [])

    const handleSwitchLang = () => {
        const nextLang = lang == 'en' ? 'vi' : 'en'
        document.cookie = `lang=${nextLang}`
        router.push(nextLang)
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