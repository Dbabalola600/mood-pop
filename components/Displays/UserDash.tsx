import Link from "next/link";
import { BsPencilSquare, BsPeopleFill } from "react-icons/bs";
import { FaReadme, FaHandsHelping } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";




export default function UserDash() {


    const Content = [
        { title: "New Post", link: "/Post", icon: "MdPostAdd" },
        { title: "New Journal", link: "/Journal/CreateNote", icon: "BsPencilSquare" },
        { title: "Seek Help", link: "/Resources/SeekHelp", icon: "FaHandsHelping" },
        { title: "People", link: "/Users", icon: "BsPeopleFill" }

    ]



    return (
        <div
            className="bg-white w-full h-1/2 pt-2 pl-5 pr-5 pb-2 lg:rounded-full rounded-3xl"
        >
            <div
                className="pl-5"
            >
                What would you like to do?
            </div>




            <hr className="pt-2 pl-5 pr-5 pb-2" />



            < div
                className=" pl-5 pr-5  text-gray-500 grid grid-cols-4 lg:overflow-x-hidden  gap-4 "
            >

                {Content.map((info, index) => (
                    <Link
                        href={info.link}
                        key={index}
                    >
                        <div
                            className=" break-words cursor-pointer  hover:text-primary  grid grid-cols-2 gap-x-0  w-[90px]  "
                        >
                            <div
                                className="text-2xl   "
                            >
                                {info.icon === "MdPostAdd" && <MdPostAdd />}
                                {info.icon === "BsPencilSquare" && <BsPencilSquare />}
                                {info.icon === "FaReadme" && <FaReadme />}
                                {info.icon === "FaHandsHelping" && <FaHandsHelping />}
                                {info.icon === "BsPeopleFill" && <BsPeopleFill color='gray-400' />}

                            </div>
                            <div
                                className="text-center hidden lg:block text-[10px]  "
                            >
                                {info.title}
                            </div>

                        </div>
                    </Link>
                ))}


            </div>


        </div>
    )
}