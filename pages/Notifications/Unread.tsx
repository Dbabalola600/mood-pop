import { useEffect, useState } from "react";
import RequestNotif from "../../components/Displays/RequestNotif";
import { getCookie } from "cookies-next";
import LoadFeed from "../../components/Loading/LoadFeed";
import { useRouter } from "next/router";
import Image from "next/image";
import new_notifications from "../../public/new_notifications.svg"




type FollReq = {

    peep: {
        _id: string,
        userId: string,
        from: string
    }
    user: {
        _id: string,
        UserName: string,
        email: string,
        isVerified: string,
        image: string
    }

}


export default function Unread() {
    const [isLoading, setLoading] = useState(false)
    const [user, setUser] = useState<FollReq[]>([])
    const token = getCookie("USER")
    const router = useRouter()

    const showinfo = async () => {
        setLoading(true)

        const body = {
            user: token
        }

        const response = await fetch("/api/Request/GetAllRequest", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as FollReq[]
        setUser(response)
        setLoading(false)
    }

    useEffect(() => {
        showinfo()

    }, [])


    const AcceptReq = async (req_id: any, user_id: any) => {

        console.log(req_id, user_id)

        const body = {
            user: token,
            id: user_id
        }
        //update follower
        const Follow = await fetch("/api/Follow/NewFollow", { method: "POST", body: JSON.stringify(body) })
            .then(async res => {
                if (res.status === 200) {
                    //delete notification

                    const body2 = {
                        id: req_id,
                        user: token,
                        cat: "request"
                    }
                    const Notireponse = await fetch("/api/Notification/MarkRead", { method: "POST", body: JSON.stringify(body2) })
                        .then(async res => {
                            if (res.status === 200) {
                                // accept request


                                const body3 = {
                                    id: req_id
                                }
                                const Reqreponse = await fetch("/api/Request/AcceptRequest", { method: "POST", body: JSON.stringify(body3) })
                                    .then(res => {
                                        if (res.status === 200) {
                                            router.push("/DashBoard")
                                        }
                                    })


                            }
                        })
                } else {
                    //error occured
                }
            })




    }


    const DeclineReq = async (req_id: any,) => {
        //delete notification

        const body2 = {
            id: req_id,
            user: token,
            cat: "request"
        }
        const Notireponse = await fetch("/api/Notification/MarkRead", { method: "POST", body: JSON.stringify(body2) })
            .then(async res => {
                if (res.status === 200) {
                    // decline request


                    const body3 = {
                        id: req_id

                    }
                    const Reqreponse = await fetch("/api/Request/DeleteRequest", { method: "POST", body: JSON.stringify(body3) })
                        .then(res => {
                            if (res.status === 200) {
                                router.push("/DashBoard")
                            }
                        })


                }
            })


    }


    return (

        <div>

            <div>
                {isLoading ? (
                    <div>
                        <LoadFeed />

                    </div>
                ) : (
                    <div>


                        {user[0] === undefined ? (
                            <div
                            className="pt-10"
                            >
                                <div
                                className="text-specgray text-[60px] text-center"
                                >
                                    Nothing new
                                </div>
                                <div>
                                    <Image
                                        src={new_notifications}
                                        width="500px"
                                        height="400px"
                                    />
                                </div>

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
                                            <RequestNotif
                                                Acceptclicky={() => { AcceptReq(info.peep._id, info.user._id) }}
                                                image={info.user.image}
                                                name={info.user.UserName}
                                                Declineclicky={() => { DeclineReq(info.peep._id) }}

                                            />
                                        </div>

                                    ))}



                                </div>

                            </div>
                        )}


                    </div>
                )}
            </div>


        </div>

    )
}