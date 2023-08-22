import { useEffect, useState } from "react";
import DefaultLayout from "../components/Layout/DefaultLayout";
import { getCookie } from "cookies-next";
import { CgProfile } from "react-icons/cg"
import LoadFeed from "../components/Loading/LoadFeed";
import SearchBar from "../components/inputs/SearchBar";
import { MdSpaceDashboard, MdNotifications, MdPostAdd } from "react-icons/md"
import { BsFillJournalBookmarkFill, BsPencilSquare, BsPeopleFill } from "react-icons/bs"
import { FaHandsHelping, FaReadme } from "react-icons/fa"
import { TbUserSearch } from "react-icons/tb"
import Link from "next/link";
import Feed from "../components/Displays/Feed";
import CusHead from "../components/Displays/CusHead";
import { TfiWrite } from "react-icons/tfi"
import UserDash from "../components/Displays/UserDash";
import Image from "next/image";
import content from "../public/content.svg"
import { useRouter } from "next/router";
import { PiShareNetworkFill } from "react-icons/pi"
import GoodToast from "../components/Displays/GoodToast";


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
    const [post, setPost] = useState<Post[]>([])
    const [showtoast, settoast] = useState({ message: "", show: false })





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


    const share = useRouter()
    const base = `https://mood-pop.vercel.app/Users/${user?.UserName}`
    // const base = `http://localhost:3000/Users/${user?.UserName}`
    const links = base



    const copylink = () => {
        settoast({ message: " message", show: true })
        navigator.clipboard.writeText(links)
    }



    useEffect(() => {
        if (showtoast.show) {
            setTimeout(() => {
                settoast({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast.show])
    //   if(post[0] === undef) 

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
                                    className="text-specgray  font-bold"
                                >

                                    <CusHead
                                        title={`Hi, ${user?.UserName}`}
                                    />
                                    <div
                                        onClick={copylink}
                                        className="cursor-pointer"
                                    >
                                        <div className="flex pt-2">
                                            <span className="mr-0 pr-0 ">
                                                Share Profile
                                            </span>
                                            <span className="mr-0 pr-0">
                                                <PiShareNetworkFill />
                                            </span>
                                        </div>



                                    </div>



                                </div>

                                {showtoast.show && <GoodToast message='Copied to Clipboard' />}

                                <div
                                    className="hidden lg:block"
                                >
                                    <SearchBar />
                                </div>


                            </div>

                            <div>

                                <UserDash />
                            </div>





                            {/* posts section */}


                            {post[0] === undefined ? (
                                <div>
                                    <div
                                        className="text-center text-3xl font-bold pt-10 "
                                    >

                                        <div
                                            className="pb-5"
                                        >
                                            Make a new post
                                        </div>
                                        <Image
                                            src={content}
                                            width="500px"
                                            height="400px"
                                        />
                                    </div>

                                </div>
                            ) : (
                                <div
                                    className="lg:mx-5 pt-5"
                                >

                                    <div
                                        className="mb-6 text-black text-2xl font-bold"
                                    >
                                        Your Posts
                                        <div
                                            className="w-[150px] bg-primary h-1 rounded-full"
                                        />
                                    </div>

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
                            )}



                        </div>

                    )}
                </div>

            </>

        </DefaultLayout>
    )
}