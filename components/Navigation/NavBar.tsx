import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import mood from "../../public/images/mood.png"
import { deleteCookie, hasCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import Image from 'next/image'


const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function UserNav() {


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
        <Disclosure as="nav" className="bg-white">
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
                                            width={34}
                                            height={50}
                                            alt="mood"
                                            onClick={() => router.push("/User/DashBoard")}
                                        />



                                    </div>


                                    <div
                                        className="hidden h-12 w-auto lg:block"
                                    >

                                        <Image

                                            src={mood}
                                            alt="mood"
                                            onClick={() => router.push("/User/DashBoard")}
                                        />

                                        <span
                                        className='text-primary'
                                        >
                                            MOOD
                                        </span>
                                    </div>

                                </div>




                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                {/* notifications */}
                                {/* <button
                                    type="button"
                                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button> */}

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex rounded-full bg-primary text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open user menu</span>

                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-8 h-8 rounded-full"
                                            >
                                                <path strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>

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
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <div
                                                        onClick={() => router.push("/User/Profile/")}
                                                        className={classNames(active ? 'bg-primary text-white' : '', 'block px-4 py-2 text-sm text-black')}
                                                    >
                                                        Your Profile
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
                            </div>
                        </div>
                    </div>


                </>
            )}
        </Disclosure>
    )
}
