import Image from "next/image";
import icons from "~/assets/icons/icons";
import { getDictionary } from "../dictionaries/dictionaries";


async function HomePage({ params }) {
    const { lang } = params
    const dict = await getDictionary(lang[0])

    return <div className="shadow-lg px-4 pt-7 pb-12 rounded-lg">
        <div className="p-3">
            <h1 className="text-3xl font-bold text-center">{dict.home.fullName}</h1>
        </div>
        <div className="flex gap-8">
            <div className="flex flex-col gap-5 w-1/4">
                <figure>
                    <Image src={icons.github} alt="" className="w-full bg-black rounded-full" />
                    <figcaption className="text-xs text-center">Front-end Developer</figcaption>
                </figure>
                <div>
                    <h2 className="text-xl font-bold">{dict.home.mySkills}</h2>
                    <div className="my-2">
                        <h3 
                            className="
                                font-bold inline text-transparent bg-gradient-to-r 
                                from-cyan-500 to-green-500 bg-clip-text
                            "
                        >{dict.home.webSkills}: </h3>
                        <span>HTML5, CSS3, ReactJS, Redux, Context, NextJS,...</span>
                    </div>
                    <hr/>
                    <div className="my-2">
                        <h3 
                            className="
                                font-bold inline text-transparent bg-gradient-to-r 
                                from-cyan-500 to-green-500 bg-clip-text
                            "
                        >{dict.home.otherSkills}: </h3>
                        <span>{dict.home.otherSkillsContent}</span>
                    </div>
                </div>
                <div className="mt-5">
                    <h2 className="text-xl font-bold">{dict.home.histories}</h2>
                    <div className="my-2">
                        <h3 className="font-bold inline text-transparent bg-gradient-to-r from-cyan-500 to-green-500 bg-clip-text">2018-2021: </h3>
                        <span>{dict.home.xmHS}</span>
                    </div>
                    <hr/>
                    <div className="my-2">
                        <h3 className="font-bold inline text-transparent bg-gradient-to-r from-cyan-500 to-green-500 bg-clip-text">2022-2023: </h3>
                        <span>{dict.home.fptCollege}</span>
                    </div>
                </div>
            </div>
            <div className="grow">
                <div className="[&>div>div>a]:text-transparent bg-gradient-to-r from-cyan-500 to-green-500 bg-clip-text">
                    <h2 className="text-2xl font-bold text-center my-4">{dict.home.contactInfo}</h2>
                    <div className="flex flex-col gap-1">
                        <div>
                            <span>Phone: </span>
                            <a href="tel:0865585166">0865585166</a>
                        </div>
                        <div>
                            <span>Zalo: </span>
                            <a href="https://zalo.me/0865585166">https://zalo.me/0865585166</a>
                        </div>
                        <div>
                            <span>Email: </span>
                            <a href="mailto:baoanh27042004@gmail.com">baoanh27042004@gmail.com</a>
                        </div>
                        <div>
                            <span>Facebook: </span>
                            <a href="https://www.facebook.com/profile.php?id=100088917412737">facebook.com/profile.php?id=100088917412737</a>
                        </div>
                        <div>
                            <span>Github: </span>
                            <a href="https://github.com/Baoanh2004">github.com/Baoanh2004</a>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 rounded-md bg-opacity-5 px-4 py-1 mt-5 shadow-sm [&>div>div>a]:text-transparent [&>div>div>a]:bg-gradient-to-r [&>div>div>a]:from-cyan-500 [&>div>div>a]:to-green-500 [&>div>div>a]:bg-clip-text">
                    <h2 className="text-2xl font-bold text-center">{dict.home.personalProject}</h2>
                    <div>
                        <div className="my-5">
                            <h3 className="text-xl font-bold">Modulars</h3>
                            <div className="ml-5 my-2">
                                <p>{dict.home.project_1_Content_1}</p>
                                <p>{dict.home.project_1_Content_2}</p>
                            </div>
                            <div className="flex gap-4 [&>a]:text-transparent bg-gradient-to-r from-cyan-500 to-green-500 bg-clip-text">
                                <a href="https://baoanh2004.github.io/F8-Project-03.1/">Demo</a>
                                <a href="https://github.com/Baoanh2004/F8-Project-03.1">Code</a>
                            </div>
                        </div>
                        <hr/>
                        <div className="my-5">
                            <h3 className="text-xl font-bold">Todo App</h3>
                            <div className="ml-5 my-2">
                                <p>{dict.home.project_2_Content_1}</p>
                                <p>{dict.home.project_2_Content_2}</p>
                            </div>
                            <div className="flex gap-4 [&>a]:text-transparent bg-gradient-to-r from-cyan-500 to-green-500 bg-clip-text">
                                <a href="https://day-47-seven.vercel.app/">Demo</a>
                                <a href="https://github.com/Baoanh2004/Frontend-Offline-K3/tree/main/Day-47">Code</a>
                            </div>
                        </div>
                        <hr/>
                        <div className="my-5">
                            <h3 className="text-xl font-bold">Trello</h3>
                            <div className="ml-5 my-2">
                                <p>{dict.home.project_3_Content_1}</p>
                                <p>{dict.home.project_3_Content_2}</p>
                            </div>
                            <div className="flex gap-4 [&>a]:text-transparent bg-gradient-to-r from-cyan-500 to-green-500 bg-clip-text">
                                <a href="https://day-53-trello.vercel.app/">Demo</a>
                                <a href="https://github.com/Baoanh2004/Frontend-Offline-K3/tree/main/Day-53">Code</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-center my-4">{dict.home.myHobbies}</h2>
                    <ul className="list-disc list-inside">
                        <li>{dict.home.myHobbiesContent1}</li>
                        <li>{dict.home.myHobbiesContent2}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
}

export default HomePage;