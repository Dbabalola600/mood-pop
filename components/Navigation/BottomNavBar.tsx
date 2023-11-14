import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'

import Link from 'next/link'

import { deleteCookie, getCookie, hasCookie } from 'cookies-next'
import { useRouter } from 'next/router'

import { MdSpaceDashboard, MdNotifications } from "react-icons/md"
import { BsFillJournalBookmarkFill } from "react-icons/bs"
import { FaReadme } from "react-icons/fa"
import { TbUserSearch } from "react-icons/tb"
import { LuHelpingHand } from "react-icons/lu"
import useSWR from 'swr'

import { CgProfile } from "react-icons/cg"



type User = {
    _id: string,
    UserName: string,
    email: string,
    isVerified: string,
    image: string
}




const Content = [
    { link: "/DashBoard", icon: "MdSpaceDashboard" },
    { link: "/Resources", icon: "LuHelpingHand" },
    { link: "/Journal", icon: "BsFillJournalBookmarkFill" },
    { link: "/Feed", icon: "FaReadme" },
    // { link: "/Search", icon: "TbUserSearch" },
    { link: "/Notifications", icon: "MdNotifications" },


]





export default function BottomNavBar() {
    const token = getCookie("USER")

    const router = useRouter()


    const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

    const { data, error } = useSWR(
        `/api/User/BarReq?user=${token}`,
        fetcher
    )




    useEffect(() => {
        if (data) {

        }
    }, [data])

    // console.log(data?.user)



    const SidebarContent = [
        { title: "Dashboard", link: "/DashBoard", icon: "MdSpaceDashboard" },
        { title: "Resources", link: "/Resources", icon: "LuHelpingHand" },
        { title: "Journal", link: "/Journal", icon: "BsFillJournalBookmarkFill" },
        { title: "Feed", link: "/Feed", icon: "FaReadme" },
        // { title: "Search", link: "/Search", icon: "TbUserSearch" },
        { title: `${data?.number}Notifications`, link: "/Notifications", icon: "MdNotifications" }

    ]


    return (



        <footer className=" bg-white dark:bg-black lg:hidden  text-gray-400 sticky bottom-0">


            <div className='grid grid-cols-5 gap-4 justify-items-center '>
                {Content.map((info, index) => (
                    <Link
                        href={info.link}
                        key={index}
                    >


                        <div>
                            {info.icon === "MdNotifications" ? (






                                <span
                                    className='indicator  cursor-pointer text-2xl hover:text-primary  rounded-lg px- py-5'
                                >
                                    <span className="indicator-item text-sm badge text-white px-2 mt-4 text-hite rounded-full bg-green-500">
                                        {data?.number}
                                    </span>
                                    <MdNotifications color='gray-400' />
                                </span>
                            ) : (<div>
                                <div
                                    className="  cursor-pointer text-2xl hover:text-primary  rounded-lg px-3 py-5"
                                >

                                    {info.icon === "MdSpaceDashboard" && <MdSpaceDashboard />}
                                    {info.icon === "BsFillJournalBookmarkFill" && <BsFillJournalBookmarkFill />}
                                    {info.icon === "FaReadme" && <FaReadme />}
                                    {info.icon === "TbUserSearch" && <TbUserSearch />}




                                    {info.icon === "LuHelpingHand" && <LuHelpingHand />}

                                </div>
                            </div>

                            )}

                        </div>




                    </Link>
                ))}

            </div>



        </footer>






    )
}
