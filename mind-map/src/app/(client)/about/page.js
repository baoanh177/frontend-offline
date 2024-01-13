import Image from "next/image"
import { images } from "~/assets/images/images"
const { aboutPrimary, member1, member2, member3, member4 } = images

console.log(images)

function AboutPage() {
    return (
        <div className="container xl:mx-auto max-w-7xl py-12 flex flex-col gap-y-12">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold">About Us</h2>
                    <p className="text-200 mt-3 pr-3">
                        It is a long established fact that a reader
                        will be distracted by the readable content of
                        a page when looking at its layout. The point
                        of using Lorem Ipsum.In the first place we
                        have granted to God, and by this our present
                        charter confirmed for us and our heirs forever
                        that the English Church shall be free, and
                        shall have her rights entire, and her
                        liberties inviolate; and we will that it be
                        thus observed; which is apparent from
                    </p>
                </div>
                <div className="relative w-full lg:w-8/12 h-[450px] bg-[#aaa] rounded-lg overflow-hidden">
                    <Image src={aboutPrimary} alt="" priority className="w-full h-full object-cover"/>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold">Our Story</h2>
                    <p className="text-200 mt-3 pr-3">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
                        The point of using Lorem Ipsum.In the first place we have granted to God, 
                        and by this our present charter confirmed for us and our heirs forever that the English Church shall be free, 
                        and shall have her rights entire, and her liberties inviolate; and we will that it be thus observed; 
                        which is apparent from
                    </p>
                </div>
                <div className="relative w-full lg:w-8/12 shadow-lg rounded-md flex gap-x-10 max-h-[350px] p-3">
                    <div className="relative flex-1 max-w-[250px] h-[180px] overflow-hidden rounded-md bg-gray-400">
                        <Image src={member1} alt="" priority className="w-full h-full object-cover"/>
                    </div>
                    <div className="relative flex-1 max-w-[250px] h-[180px] overflow-hidden rounded-md bg-gray-400">
                        <Image src={member2} alt="" priority className="w-full h-full object-cover"/>
                    </div>
                    <div className="relative flex-1 max-w-[250px] h-[180px] overflow-hidden rounded-md bg-gray-400">
                        <Image src={member3} alt="" priority className="w-full h-full object-cover"/>
                    </div>
                    <div className="relative flex-1 max-w-[250px] h-[180px] overflow-hidden rounded-md bg-gray-400">
                        <Image src={member4} alt="" priority className="w-full h-full object-cover"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage
