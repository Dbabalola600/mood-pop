import CusHead from "../../components/Displays/CusHead";
import ErrToast from "../../components/Displays/ErrToast";
import GoodToast from "../../components/Displays/GoodToast";
import UserSearchResult from "../../components/Displays/UserSearchResult";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import { getCookie } from "cookies-next";
import Image from "next/image";
import search_l from "../../public/search_l.svg"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadFeed from "../../components/Loading/LoadFeed";
import useSWR from "swr";




type User = {
    _id: string,
    UserName: string,
    email: string,
    isVerified: string,
    image: string
}

type Data = {
    _id: string
    userId: string
    from: string
}


export default function Person() {
    const [isLoading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const token = getCookie("USER")
    const router = useRouter()
    const [showtoast, settoast] = useState({ message: "", show: false })
    const [showtoast2, settoast2] = useState({ message: "", show: false })

    let ssd = router.query



    const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

    const { data, error } = useSWR(
        `/api/User/GetUserLink?id=${ssd._id}`,
        fetcher
    )

    const search = async () => {
        setLoading(true)
        const body = {
            id: ssd._id
        }

        const response = await fetch(`/api/User/GetUserLink?id=${ssd._id}`, { method: "POST" })
            .then(res => res.json()) as User

        setUser(response)

        console.log(response)

        setLoading(false)
    }

    // useEffect(() => {
    //     search()

    // }, [])


    useEffect(() => {
        if (data) {

        }
    }, [data])

    const SendReq = async (id: any) => {

        const body = {
            user: token,
            id: id
        }
        const reponse = await fetch("/api/Request/NewRequest", { method: "POST", body: JSON.stringify(body) })
            .then(async res => {
                if (res.status === 200) {
                    //send notification
                    const data = await res.json() as Data;

                    const body2 = {
                        user: id,
                        cat: "request",
                        id: data._id
                    }
                    const NotiRes = await fetch("/api/Notification/NewNotification", { method: "POST", body: JSON.stringify(body2) })
                        .then(res => {
                            if (res.status === 200) {
                                settoast({ message: " message", show: true })
                                router.push("/DashBoard")

                                //send email notification
                            }
                        }).catch(err => {
                            console.log(err)
                        })





                } if (res.status === 202) {
                    settoast({ message: " message", show: true })

                    console.log("alreadysent")
                    router.push("/DashBoard")

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
        <DefaultLayout>
            <div>
                <div>
                    <div
                        className="mb-5"
                    >
                        <CusHead
                            title={`Search Result for ${ssd._id} `}
                        />
                    </div>


                    {isLoading ? (
                        <div>
                            <LoadFeed />
                        </div>
                    ) : (





                        <div>



                            {data?.UserName === undefined ? (
                                <div>

                                    <div> no results</div>
                                    <div>
                                        <Image
                                            src={search_l}
                                            width={"400px"}
                                            height={"300px"}
                                        />

                                    </div>

                                </div>

                            ) : (
                                <div>

                                    {showtoast.show && <GoodToast message='Request Sucessful' />}

                                    {showtoast2.show && <ErrToast message="Something went wrong" />}



                                    <div

                                    >

                                        <UserSearchResult
                                            image={data?.image}
                                            name={data?.UserName}
                                            clicky={() => SendReq(data?._id)}
                                        />


                                    </div>

                                </div>
                            )}






                        </div>
                    )}

                </div>
            </div>
        </DefaultLayout>
    )
}