import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'

import Link from 'next/link'

import { deleteCookie, hasCookie } from 'cookies-next'
import { useRouter } from 'next/router'

import { MdSpaceDashboard, MdNotifications } from "react-icons/md"
import { BsFillJournalBookmarkFill } from "react-icons/bs"
import { FaReadme } from "react-icons/fa"
import { TbUserSearch } from "react-icons/tb"
import {LuHelpingHand} from "react-icons/lu"

const Content = [
    { link: "/DashBoard", icon: "MdSpaceDashboard" },
    {link:"/Resources", icon:"LuHelpingHand"},
    { link: "/Journal", icon: "BsFillJournalBookmarkFill" },
    { link: "/Feed", icon: "FaReadme" },
    { link: "/Search", icon: "TbUserSearch" },
    {link: "/Notifications", icon:"MdNotifications"},
 

]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function BottomNavBar() {


    const router = useRouter()
    const logout = async () => {
        //e.preventDefault()


        // setLoading(true)

        const userCheck = hasCookie("NormUser")

        if (userCheck == true) {
            deleteCookie('NormUser', { path: '/', domain: 'localhost' })

            router.push('/')

        }

        // setLoading(false)
    }

    return (
        <div className=" bg-white dark:bg-black lg:hidden  text-gray-400 sticky bottom-0">


            <div className='grid grid-cols-6 gap-4 justify-items-center '>
                {Content.map((info, index) => (
                    <Link
                        href={info.link}
                        key={index}
                    >
                        <div
                            className="  cursor-pointer text-2xl hover:text-primary  rounded-lg px-3 py-5"
                        >

                            {info.icon === "MdSpaceDashboard" && <MdSpaceDashboard />}
                            {info.icon === "BsFillJournalBookmarkFill" && <BsFillJournalBookmarkFill />}
                            {info.icon === "FaReadme" && <FaReadme />}
                            {info.icon === "TbUserSearch" && <TbUserSearch />}
                            {info.icon === "MdNotifications" && <MdNotifications  color='gray-400'/>}
                            {info.icon === "LuHelpingHand" && <LuHelpingHand />}
                          
                        </div>
                    </Link>
                ))}

            </div>




        </div>
    )
}
