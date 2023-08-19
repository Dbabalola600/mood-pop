import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import mood from "../../public/images/mood.png"
import { deleteCookie, hasCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { AiOutlineSetting } from "react-icons/ai"
import { BiLogOut } from "react-icons/bi"


const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar() {


    const router = useRouter()
    const logout = async () => {
        //e.preventDefault()


        // setLoading(true)

        const userCheck = hasCookie("USER")

        if (userCheck == true) {
            deleteCookie('USER', { path: '/', domain: 'localhost' })

            router.push('/')

        }

        // setLoading(false)
    }

    return (
        <Disclosure as="nav" className=" dark:bg-black bg-white">
            {({ open }) => (
                <>
                    <div className="mx-auto px-2 sm:px-6 lg:px-8  ">
                        <div className="relative flex h-16 items-center justify-between">


                            {/* Settings */}
                            <button
                                type="button"
                                className=" lg:hidden rounded-full  p-1 text-gray-400 hover:text-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="sr-only">View notifications</span>

                                <AiOutlineSetting
                                    className='h-6 w-6'
                                />

                                {/* <BellIcon 
                                    className="h-6 w-6 " 
                                    aria-hidden="true" /> */}
                            </button>


                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">

                                    <div
                                        className="block h-12 w-auto lg:hidden"
                                    >

                                        <Image
                                            src={mood}
                                            width={50}
                                            height={50}
                                            alt="mood"
                                            onClick={() => router.push("/DashBoard")}
                                        />



                                    </div>


                                    <div
                                        className="hidden  w-auto lg:block"
                                    >

                                        <Image

                                            src={mood}
                                            className='w-10 h-10'
                                            height={50}
                                            width={50}
                                            alt="mood"
                                            onClick={() => router.push("/DashBoard")}
                                        />


                                    </div>
                                    <span
                                        className='text-primary font-extrabold text-center mx-2 text-2xl  hidden lg:block'
                                    >
                                        MOOD
                                    </span>
                                </div>




                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                {/* Settings */}

                                <button
                                    type="button"
                                    className=" hidden lg:block rounded-full  p-1 text-gray-400 hover:text-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    onClick={() => router.push("/Settings")}
                                >
                                    <span className="sr-only">View notifications</span>

                                    <AiOutlineSetting
                                        className='h-6 w-6'
                                    />

                                    {/* <BellIcon 
                                    className="h-6 w-6 " 
                                    aria-hidden="true" /> */}
                                </button>





                                <button
                                    type="button"
                                    className="rounded-full  p-1 text-gray-400 hover:text-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    onClick={logout}
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BiLogOut
                                        className='h-6 w-6'
                                    />


                                </button>







                            </div>
                        </div>
                    </div>


                </>
            )}
        </Disclosure>
    )
}
