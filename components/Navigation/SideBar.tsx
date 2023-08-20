import Link from "next/link";
import { useEffect, useState } from "react";
import { MdSpaceDashboard, MdNotifications } from "react-icons/md"
import { BsFillJournalBookmarkFill } from "react-icons/bs"
import { FaReadme } from "react-icons/fa"
import { TbUserSearch } from "react-icons/tb"
import { getCookie } from "cookies-next";
import { CgProfile } from "react-icons/cg"



type User = {
    _id: string,
    UserName: string,
    email: string,
    isVerified: string,
    image: string
}




export default function UserSideBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    const [user, setUser] = useState<User | null>(null)

    const showinfo = async () => {


        const token = getCookie("USER")
        const body = {
            id: token
        }

        const response = await fetch("/api/User/GetUser", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as User
        setUser(response)

    }

    useEffect(() => {
        showinfo()

    }, [])



    const Content = [
        { title: "Dashboard", link: "/DashBoard", icon: "MdSpaceDashboard" },
        { title: "Journal", link: "/Journal", icon: "BsFillJournalBookmarkFill" },
        { title: "Feed", link: "/Feed", icon: "FaReadme" },
        { title: "Search", link: "/Search", icon: "TbUserSearch" },
        {title:"Notifications",link: "/Notifications", icon:"MdNotifications"}

    ]

    return (
        
        <div className=":h-screen hidden lg:block dark:bg-black bg-white">

            {user?.image === undefined ? (
                <div className="flex justify-center items-center pt-10 ">
                    <div className="avatar">
                        <div className="w-40 h-40 text-center rounded-full flex justify-center items-center">
                            <CgProfile className="w-32 h-32 text-gray-600" />
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className="mx-20"
                >
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img
                                src={`${user?.image}`}
                                alt="User Profile Pic"
                            // className="rounded-badge"
                            // style={{ maxWidth: "50%",  }}
                            /> </div>
                    </div>
                </div>
            )}




            < div
                className="hidden lg:block px-4  py-10 space-y-3  text-gray-500"
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
                                {info.icon === "MdNotifications" && <MdNotifications  color='gray-400'/>}
                            
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
            
        </div >
    );



}




