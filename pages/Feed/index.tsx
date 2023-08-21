import Link from "next/link";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import CusHead from "../../components/Displays/CusHead";
import LoadFeed from "../../components/Loading/LoadFeed";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import UserDash from "../../components/Displays/UserDash";
import SearchBar from "../../components/inputs/SearchBar";
import PostFeed from "../../components/Displays/PostFeed";


type User = {
    _id: string,
    UserName: string,
    email: string,
    isVerified: string,
    image: string
}


type Post = {
    post: {
        userId: string,
        post: string
        category: string
        date: string
    },
    user: {
        _id: string,
        UserName: string,
        email: string,
        isVerified: string,
        image: string
    }

}



export default function Feed() {
    const [isLoading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [post, setPost] = useState<Post[]>([])

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

        const PostResponse = await fetch("/api/Post/GetFollowingPost", { method: "POST", body: JSON.stringify(body2) })
            .then(res => res.json()) as Post[]
        setPost(PostResponse)



        setLoading(false)
    }

    useEffect(() => {
        showinfo()

    }, [])



    return (
        <DefaultLayout>
            <div>



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

                            <div>

                                <UserDash />
                            </div>





                            {/* posts section */}


                            {post[0] === undefined ? (
                                <div>
                                    <div
                                        className="text-center text-3xl font-bold "
                                    >
                                        you should post something

                                        nonye give me an image to add here please

                                    </div>

                                </div>
                            ) : (
                                <div
                                    className="lg:mx-5 pt-10"
                                >

                                    <div
                                        className="mb-6 text-black text-2xl font-bold"
                                    >
                                        Your Feed
                                        <div
                                            className="w-[150px] bg-primary h-1 rounded-full"
                                        />
                                    </div>

                                    {post.map((info, index) => (
                                        <div
                                            key={index}
                                        >

                                            <PostFeed
                                               content={info.post.post}
                                               date={info.post.date}
                                               image={info.user.image}
                                               name={info.user.UserName}
                                               title={info.post.category}
                                            />

                                        </div>
                                    ))}


                                </div>
                            )}



                        </div>

                    )}
                </div>









            </div>
        </DefaultLayout>
    )
}