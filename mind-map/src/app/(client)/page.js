import Image from "next/image";
import Link from "next/link";
import mindMap from "~/assets/images/mind-map.png"

function Home() {
    return (
        <div className="flex items-center">
            <div>
                <h2 className="text-6xl">Collaborative mind <br/> mapping</h2>
                <p className="text-xl mt-5 mb-8">
                    Miro’s mind map maker is the quickest, easiest way for teams to capture, <br/>
                    organize, and map out their ideas in a structured way.
                </p>
                <Link href="/" className="bg-green-600 text-white py-3 px-5 rounded-lg text-[17px] cursor-pointer">
                    Try it for free
                </Link>
            </div>
            <div className="grow flex justify-center">
                <Image src={mindMap} alt="" className="w-[500px] h-auto" priority/>
            </div>
        </div>
    )
}

export default Home
