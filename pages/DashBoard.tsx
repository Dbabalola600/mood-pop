import { useEffect, useState } from "react";
import DefaultLayout from "../components/Layout/DefaultLayout";
import { getCookie } from "cookies-next";
import { CgProfile } from "react-icons/cg"
import LoadFeed from "../components/Loading/LoadFeed";
import SearchBar from "../components/inputs/SearchBar";
import { MdSpaceDashboard, MdNotifications, MdPostAdd } from "react-icons/md"
import { BsFillJournalBookmarkFill, BsPencilSquare } from "react-icons/bs"
import { FaReadme } from "react-icons/fa"
import { TbUserSearch } from "react-icons/tb"
import Link from "next/link";
import Feed from "../components/Displays/Feed";
import CusHead from "../components/Displays/CusHead";
import {TfiWrite} from "react-icons/tfi"





type User = {
    _id: string,
    UserName: string,
    email: string,
    isVerified: string,
    image: string
}


type Post = {
    userId: string,
    post: string
    category: string
    date: string
}


export default function DashBoard() {
    const [isLoading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [post, setPost] = useState<Post []>([])


    const showinfo = async () => {
        setLoading(true)
        const token = getCookie("USER")
        const body = {
            id: token
        }

        const response = await fetch("/api/User/GetUser", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as User
        setUser(response)

        const body2 = {
            userId: token
        }

        const PostResponse = await fetch("/api/Post/GetPost", { method: "POST", body: JSON.stringify(body2) })
            .then(res => res.json()) as Post[]
        setPost(PostResponse)


        setLoading(false)
    }

    useEffect(() => {
        showinfo()

    }, [])


    // console.log(user?.image)



    const Content = [
        { title: "New Post", link: "/Post", icon: "MdPostAdd" },
        { title: "New Journal", link: "/Journal", icon: "BsPencilSquare" },
        { title: "Search", link: "/Search", icon: "TbUserSearch" },
        { title: "Notifications", link: "/Notifications", icon: "MdNotifications" }

    ]



    const journal = [
        { content: "yhhd", date: "today" },
        { content: "seconf", date: "yesterday" }
    ]

    return (
        <DefaultLayout>
            <>
                <div>
                    {isLoading ? (
                        <div>
                            <LoadFeed />
                        </div>
                    ) : (


                        <div>

                            <div
                                className="lg:mx-5 grid lg:grid-cols-2 grid-cols-1 mb-5 lg:mb-0 "
                            >
                                <div
                                    className="text-specgray lg:text-5xl text-2xl font-bold"
                                >

                                    <CusHead
                                        title={`Hi, ${user?.UserName}`}
                                    />


                                </div>

                                <div
                                    className="hidden lg:block"
                                >
                                    <SearchBar />
                                </div>


                            </div>


                            <div
                                className="bg-white w-full h-1/2 pt-2 pl-5 pr-5 pb-2 lg:rounded-full rounded-3xl"
                            >
                                <div
                                    className="pl-5"
                                >
                                    What would you like to do?
                                </div>




                                <hr className="pt-2 pl-5 pr-5 pb-2" />



                                < div
                                    className=" pl-5 pr-5  text-gray-500 grid grid-cols-4 lg:overflow-x-hidden  gap-4 "
                                >

                                    {Content.map((info, index) => (
                                        <Link
                                            href={info.link}
                                            key={index}
                                        >
                                            <div
                                                className=" break-words cursor-pointer  hover:text-primary  grid grid-cols-2 gap-x-0  w-[90px]  "
                                            >
                                                <div
                                                    className="text-2xl   "
                                                >
                                                    {info.icon === "MdPostAdd" && <MdPostAdd />}
                                                    {info.icon === "BsPencilSquare" && <BsPencilSquare />}
                                                    {info.icon === "FaReadme" && <FaReadme />}
                                                    {info.icon === "TbUserSearch" && <TbUserSearch />}
                                                    {info.icon === "MdNotifications" && <MdNotifications color='gray-400' />}

                                                </div>
                                                <div
                                                    className="text-center hidden lg:block text-[10px]  "
                                                >
                                                    {info.title}
                                                </div>

                                            </div>
                                        </Link>
                                    ))}


                                </div>


                            </div>


                            <div
                                className="lg:mx-5 pt-10"
                            >

                                {post.map((info, index) => (
                                    <div
                                    key={index}
                                    >

                                        <Feed
                                            content={info.post}
                                            date={info.date}
                                            image={user?.image}
                                            name={user?.UserName}
                                        />

                                    </div>
                                ))}


                            </div>


                        </div>

                    )}
                </div>

            </>

        </DefaultLayout>
    )
}