import Link from "next/link";
import { useEffect, useState } from "react";
import { MdSpaceDashboard, MdNotifications } from "react-icons/md"
import { BsFillJournalBookmarkFill } from "react-icons/bs"
import { FaReadme } from "react-icons/fa"
import { TbUserSearch } from "react-icons/tb"
import { getCookie } from "cookies-next";
import { CgProfile } from "react-icons/cg"
import {LuHelpingHand} from "react-icons/lu"
import useSWR from "swr";


type User = {
    _id: string,
    UserName: string,
    email: string,
    isVerified: string,
    image: string
}




export default function UserSideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const token = getCookie("USER")
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

    const { data, error } = useSWR(
        `/api/User/BarReq?user=${token}`,
        fetcher
    )


    const [user, setUser] = useState<User | null>(null)

    const showinfo = async () => {


     
        const body = {
            id: token
        }

        const response = await fetch("/api/User/GetUser", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as User
        setUser(response)

    }

    // useEffect(() => {
    //     showinfo()

    // }, [])


    useEffect(() => {
        if (data) {

        }
    }, [data])

    console.log(data)

    const Content = [
        { title: "Dashboard", link: "/DashBoard", icon: "MdSpaceDashboard" },
        { title: "Resources", link: "/Resources", icon: "LuHelpingHand" },
        { title: "Journal", link: "/Journal", icon: "BsFillJournalBookmarkFill" },
        { title: "Feed", link: "/Feed", icon: "FaReadme" },
        // { title: "Search", link: "/Search", icon: "TbUserSearch" },
        { title: `${data?.number}Notifications`, link: "/Notifications", icon: "MdNotifications" }

    ]

    return (

        <div className=":h-screen hidden lg:block dark:bg-black bg-white">

            {data?.user.image === undefined ? (
                <div className="flex justify-center items-center pt-5 ">
                    <div className="avatar">
                        <div className="w-40 h-30 text-center rounded-full flex justify-center items-center">
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
                                src={`${data?.user.image}`}
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
                            className="  cursor-pointer text-xl hover:text-primary rounded-lg px-1 py-5 space-x-0 grid grid-cols-2 w-20"
                        >
                            <div
                                className="items-center py-1 "
                            >
                                {info.icon === "MdSpaceDashboard" && <MdSpaceDashboard />}
                                {info.icon === "BsFillJournalBookmarkFill" && <BsFillJournalBookmarkFill />}
                                {info.icon === "FaReadme" && <FaReadme />}
                                {info.icon === "TbUserSearch" && <TbUserSearch />}
                                {info.icon === "MdNotifications" && <MdNotifications color='gray-400' />}
                                {info.icon === "LuHelpingHand" && <LuHelpingHand />}
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




