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



    const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

    const { data, error } = useSWR(
        `/api/Notification/CountNotifications?user=${token}`,
        fetcher
    )


    useEffect(() => {
        if (data) {

        }
    }, [data])


    return (
        <div className=" bg-white dark:bg-black lg:hidden  text-gray-400 sticky bottom-0">


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
                                        {data}
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




        </div>
    )
}
