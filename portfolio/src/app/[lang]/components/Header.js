"use client"
import Link from "next/link";
import Image from "next/image";
import icons from "~/assets/icons/icons";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { useSession } from "next-auth/react";

function Header({ dict, lang }) {
    const { data: session } = useSession()

    if(session) {
        console.log(session)
    }
    
    return <>
        <header className="fixed top-0 left-0 right-0 flex justify-center bg-gray-600 bg-opacity-20">
            <div className="w-[1200px] px-5 flex justify-between items-center h-16">
                <div className="flex items-center gap-5 text-transparent bg-gradient-to-r from-cyan-500 to-green-500 bg-clip-text">
                    <div className="flex items-center">
                        <Image src={icons.logo} alt="" className="w-16"/>
                        <h1 className="text-xl font-bold">{dict.home.fullName}</h1>
                    </div>
                    <nav>
                        <ul className="flex gap-3">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/blogs">Blogs</Link>
                            </li>
                            <li>
                                <Link href="/contact">Contact</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center gap-3 [&>a>img]:w-6 [&>a>img]:h-6 [&>*]:hover:cursor-pointer">
                    <a href="">
                        <Image src={icons.f8} alt="" className="rounded-md"/>
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100088917412737">
                        <Image src={icons.facebook} alt=""/>
                    </a>
                    <a href="https://github.com/Baoanh2004">
                        <Image src={icons.github} alt=""/>
                    </a>
                    {
                        session ? 
                        <Link href={`/${lang}/profile`}>
                            <img src={session.user.image} alt="" />
                        </Link>
                        :
                        <Link href={`/${lang}/auth`}>
                            <Image src={icons.user} alt=""/>
                        </Link>
                    }
                    <ThemeSwitcher/>
                    <LanguageSwitcher lang={lang}/>
                </div>
            </div>
        </header>
    </>
}

export default Header;