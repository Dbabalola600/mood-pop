import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import LoadFeed from "../../components/Loading/LoadFeed"
import FollowingResult from "../../components/Displays/FollowingResult"


type User = {

    _id: string,
    UserName: string,
    email: string,
    isVerified: string,
    image: string

}

export default function Follower() {

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

                            no one
                        </div>
                    ) : (
                        <div>

                            <div
                                className="mt-5"
                            >


                                {user.map((info, index) => (
                                    <div
                                        key={index}
                                    >
                                        <FollowingResult
                                            clicky={() => { }}
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