import { useRouter } from "next/router";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import { useEffect, useState } from "react";
import LoadFeed from "../../components/Loading/LoadFeed";
import CusHead from "../../components/Displays/CusHead";
import UserSearchResult from "../../components/Displays/UserSearchResult";
import { getCookie } from "cookies-next";
import Image from "next/image";
import search_l from "../../public/search_l.svg"


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




export default function Found() {
    const [isLoading, setLoading] = useState(false)
    const [user, setUser] = useState<User[]>([])
    const token = getCookie("USER")
    const router = useRouter()
    let ssd = router.query


    const search = async () => {
        setLoading(true)


        const body = {
            find: ssd.find
        }
        const response = await fetch("/api/User/FindUser", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as User[]

        setUser(response)

        // console.log(response)

        setLoading(false)
    }





    useEffect(() => {
        search()

    }, [])




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
                                router.push("/DashBoard")

                                //send email notification
                            }
                        }).catch(err => {
                            console.log(err)
                        })





                } if (res.status === 202) {
                    console.log("alreadysent")

                }
            })


    }

    return (
        <DefaultLayout>
            <div>

                <div
                    className="mb-5"
                >
                    <CusHead
                        title={`Search Result for ${ssd.find}`}
                    />
                </div>


                {isLoading ? (
                    <div>
                        <LoadFeed />
                    </div>
                ) : (





                    <div>



                        {user[0] === undefined ? (
                            <div>
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

                                {user.map((info, index) => (
                                    <div
                                        key={index}
                                    >

                                        <UserSearchResult
                                            image={info.image}
                                            name={info.UserName}
                                            clicky={() => SendReq(info._id)}
                                        />


                                    </div>
                                ))}
                            </div>
                        )}






                    </div>
                )}
            </div>
        </DefaultLayout>
    )
}