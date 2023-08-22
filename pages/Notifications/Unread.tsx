import { useEffect, useState } from "react";
import RequestNotif from "../../components/Displays/RequestNotif";
import { getCookie } from "cookies-next";
import LoadFeed from "../../components/Loading/LoadFeed";
import { useRouter } from "next/router";
import Image from "next/image";
import new_notifications from "../../public/new_notifications.svg"
import ErrToast from "../../components/Displays/ErrToast";
import GoodToast from "../../components/Displays/GoodToast";




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
    const [showtoast, settoast] = useState({ message: "", show: false })
    const [showtoast2, settoast2] = useState({ message: "", show: false })
    const [showtoast3, settoast3] = useState({ message: "", show: false })


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
        try {


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
                        // settoast({ message: " message", show: true })


                        console.log("1")

                        const body2 = {
                            id: req_id,
                            user: token,
                            cat: "request"
                        }
                        const Notireponse = await fetch("/api/Notification/MarkRead", { method: "POST", body: JSON.stringify(body2) })
                            .then(async res => {
                                if (res.status === 200) {
                                    // accept request

                                    // settoast({ message: " message", show: true })
                                    console.log("2")
                                    const body3 = {
                                        id: req_id
                                    }
                                    const Reqreponse = await fetch("/api/Request/AcceptRequest", { method: "POST", body: JSON.stringify(body3) })
                                        .then(res => {
                                            if (res.status === 200) {
                                                console.log("3")
                                                settoast({ message: " message", show: true })
                                                router.push("/DashBoard")
                                            }
                                        })


                                }
                            })
                    } else {
                        //error occured
                    }
                })

        } catch (error) {
            console.error("An error occurred:", error);
            // Handle the error appropriately
        }


    }



    const BigAccept = async (req_id: any, user_id: any) => {

        const body = {
            user: token,
            req_id: req_id,
            id: user_id
        }


        const Reqreponse = await fetch("/api/Follow/MegaNewFollow", { method: "POST", body: JSON.stringify(body) })
        .then(res => {
            if (res.status === 200) {
                console.log("3")
                settoast({ message: " message", show: true })
                router.push("/DashBoard")
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
                                settoast2({ message: " message", show: true })

                                router.push("/DashBoard")
                            }
                        })


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


    useEffect(() => {
        if (showtoast2.show) {
            setTimeout(() => {
                settoast2({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast2.show])


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

                                {showtoast.show && <GoodToast message='Accepted Request' />}

                                {showtoast2.show && <ErrToast message="Declined Request" />}

                                <div
                                    className="mt-5"
                                >


                                    {user.map((info, index) => (
                                        <div
                                            key={index}
                                        >
                                            <RequestNotif
                                                Acceptclicky={() => {
                                                    BigAccept(
                                                        info.peep._id,
                                                        info.user._id
                                                    )
                                                }}
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