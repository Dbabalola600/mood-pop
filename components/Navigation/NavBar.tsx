import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import mood from "../../public/images/mood.svg"
import { deleteCookie, getCookie, hasCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { AiOutlineSetting } from "react-icons/ai"
import { BiLogOut } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"


const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}






type User = {
    _id: string,
    UserName: string,
    email: string,
    isVerified: string,
    image: string
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

    return (
        <Disclosure as="nav" className=" dark:bg-black bg-white">
            {({ open }) => (
                <>
                    <div className="mx-auto px-2 sm:px-6 lg:px-8  ">
                        <div className="relative flex h-16 items-center justify-between">





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

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3   lg:hidden block">
                                    <div>
                                        <Menu.Button className="flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open user menu</span>

                                            {user?.image === undefined ? (
                                                <div className="flex justify-center items-center  ">
                                                    <div className="avatar">
                                                        <div className=" text-center rounded-full flex justify-center items-center">
                                                            <CgProfile className=" h-6 w-6 text-gray-400" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex justify-center items-center  ">
                                                    <div className="avatar">
                                                        <div className=" text-center rounded-full flex justify-center items-center">
                                                            <img
                                                                src={`${user?.image}`}
                                                                alt="User Profile Pic"
                                                                className='h-6 w-6'
                                                            // className="rounded-badge"
                                                            style={{ maxWidth: "100%", height:"40px"  }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* <img
                                                className="h-8 w-8 rounded-full"
                                                // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            /> */}


                                        </Menu.Button>
                                    </div>


                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-400 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <div
                                                        onClick={() => router.push("/Settings")}
                                                        className={classNames(active ? 'bg-primary text-white' : '', 'block px-4 py-2 text-sm text-black')}
                                                    >
                                                        Settings
                                                    </div>
                                                )}
                                            </Menu.Item>

                                            <Menu.Item>
                                                {({ active }) => (
                                                    <div

                                                        className={classNames(active ? 'bg-red-500 text-white' : '', 'block px-4 py-2 text-sm text-black')}
                                                        onClick={logout}
                                                    >
                                                        Sign out
                                                    </div>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>






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


                                </button>




                                {/* logout */}
                                <button
                                    type="button"
                                    className="rounded-full hidden lg:block p-1 text-gray-400 hover:text-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
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
