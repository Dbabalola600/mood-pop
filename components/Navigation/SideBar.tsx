import Link from "next/link";
import { useState } from "react";


export default function UserSideBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    const Content = [
        { title: "Dashboard", link: "/User/DashBoard", icon:" icon"  },
        { title: "Sent", link: "/User/Memo/Sent/" },
        {title: "Compose Memo", link:"/User/Memo/CreateMemo"},
        { title: "Memos", link: "/User/Memo" },
        {title: "Department"    , link:"/User/Memo/DepartmentMemo"},
        {title: "College"    , link:"/User/Memo/CollegeMemo"},
        {title: "Personal", link:"/User/Memo/PersonalMemo"}
    ]

    return (
        <div className=":h-screen  bg-white">

            <div className="flex justify-between items- px-4 py-6">

                {/* <h1 className="text-white text-2xl font-bold lg:block hidden">User Sidebar</h1> */}

                <button
                    className="text-primary focus:outline-none lg:hidden  focus:text-white    "
                    onClick={toggleSidebar}
                >
                    {isOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="blue"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="blue"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>

            </div>

            <div
                className="hidden lg:block px-4 space-y-3 text-gray-500"
            >

                {Content.map((info, index) => (
                    <Link
                        href={info.link}
                        key={index}
                    >
                        <div
                            className="  cursor-pointer text-2xl  hover:text-primary rounded-lg px-3 py-5 "
                        >

                            {info.icon}
                            {info.title}
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




