import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import LoadFeed from "../../components/Loading/LoadFeed"
import FollowingResult from "../../components/Displays/FollowingResult"
import Image from "next/image"
import people1 from "../../public/people1.svg"
import GoodToast from "../../components/Displays/GoodToast"
type User = {

    _id: string,
    UserName: string,
    email: string,
    isVerified: string,
    image: string

}

export default function Follower() {
    const [showtoast, settoast] = useState({ message: "", show: false })

    const [isLoading, setLoading] = useState(false)
    const [user, setUser] = useState<User[]>([])
    const token = getCookie("USER")
    const router = useRouter()

    const showinfo = async () => {
        setLoading(true)

        const body = {
            id: token
        }

        const response = await fetch("/api/Follow/GetFollowers", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as User[]
        setUser(response)

        console.log(response)
        setLoading(false)
    }

    useEffect(() => {
        showinfo()

    }, [])


    const removeFollower = async (id: any) => {

        const body = {
            user: token,
            id: id
        }


        const response = await fetch("/api/Follow/Unfollow", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status === 200) {
                    settoast({ message: " message", show: true })

                    router.reload()
                }
            })
    }



    useEffect(() => {
        if (showtoast.show) {
            setTimeout(() => {
                settoast({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast.show])


    return (
        <div>
            {isLoading ? (
                <div>
                    <LoadFeed />

                </div>
            ) : (
                <div>


                    {user[0] === undefined ? (
                        <div>

                            <div
                                className="mt-5"
                            >
                                <Image
                                    src={people1}
                                    width="200px"
                                    height="200px"
                                />

                            </div>
                        </div>
                    ) : (
                        <div>

                            <div
                                className="mt-5"
                            >

                                {showtoast.show && <GoodToast message='Sucessful' />}


                                {user.map((info, index) => (
                                    <div
                                        key={index}
                                    >
                                        <FollowingResult
                                            clicky={() => {removeFollower(info._id) }}
                                            image={info.image}
                                            name={info.UserName}
                                        />
                                    </div>

                                ))}



                            </div>

                        </div>
                    )}


                </div>
            )}
        </div>
    )
}