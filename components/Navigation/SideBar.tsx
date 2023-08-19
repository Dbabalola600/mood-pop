import Link from "next/link";
import { useState } from "react";
import { MdSpaceDashboard } from "react-icons/md"
import { BsFillJournalBookmarkFill } from "react-icons/bs"
import { FaReadme } from "react-icons/fa"
import { TbUserSearch } from "react-icons/tb"

export default function UserSideBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    const Content = [
        { title: "Dashboard", link: "/DashBoard", icon: "MdSpaceDashboard" },
        { title: "Journal", link: "/Journal", icon: "BsFillJournalBookmarkFill" },
        { title: "Feed", link: "/Feed", icon: "FaReadme" },
        { title: "Search", link: "/Search", icon: "TbUserSearch" }

    ]

    return (
        <div className=":h-screen dark:bg-black bg-white">



            <div
                className="hidden lg:block px-4  py-12 space-y-3  text-gray-500"
            >

                {Content.map((info, index) => (
                    <Link
                        href={info.link}
                        key={index}
                    >
                        <div
                            className="  cursor-pointer text-2xl hover:text-primary rounded-lg px-3 py-5 space-x-0 grid grid-cols-2 w-20"
                        >
                            <div
                                className="items-center py-1 "
                            >
                                {info.icon === "MdSpaceDashboard" && <MdSpaceDashboard />}
                                {info.icon === "BsFillJournalBookmarkFill" && <BsFillJournalBookmarkFill />}
                                {info.icon === "FaReadme" && <FaReadme />}
                                {info.icon === "TbUserSearch" && <TbUserSearch />}

                            </div>
                            <div
                                className=" "
                            >
                                {info.title}
                            </div>

                        </div>
                    </Link>
                ))}




            </div>
            {isOpen && (
                <nav className="flex flex-col">

                    {Content.map((info, index) => (
                        <Link
                            href={info.link}
                            key={index}
                        >
                            <div
                                className=" text-primary cursor-pointer  hover:bg-green-500 hover:text-primary rounded-lg px-3 py-2 "
                            >
                                {info.title}
                            </div>
                        </Link>
                    ))}

                </nav>
            )}
        </div>
    );



}




