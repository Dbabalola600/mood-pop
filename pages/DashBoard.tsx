import { useEffect, useState } from "react";
import DefaultLayout from "../components/Layout/DefaultLayout";
import { getCookie } from "cookies-next";
import { CgProfile } from "react-icons/cg"



type User = {
    _id: string,
    UserName: string,
    email: string,
    isVerified: string,
    image: string
}


export default function DashBoard() {
    const [user, setUser] = useState<User | null>(null)

    const showinfo = async () => {


        const token = getCookie("USER")
        const body = {
            id: token
        }

        const response = await fetch("/api/User/GetUser", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as User
        setUser(response)

    }

    useEffect(() => {
        showinfo()

    }, [])


    // console.log(user?.image)



    return (
        <DefaultLayout>
            <>
                <div>

                    DashBoard {user?.UserName}


                    {user?.image === undefined ? (
                        <div className="flex justify-center items-center h-screen">
                            <div className="avatar">
                                <div className="w-40 h-40 text-center rounded-full flex justify-center items-center">
                                    <CgProfile className="w-32 h-32 text-gray-600" />
                                </div>
                            </div>
                        </div>

                    ) : (
                        <div>
                            {user?.image && (
                                <div
                                // className="bg-red-500 rounded-xl w-10"
                                >
                                    <img
                                        src={`${user.image}`}
                                        alt="User Profile Pic"
                                        className="rounded-badge"
                                        style={{ maxWidth: "10%", height: "30px", }}
                                    />
                                </div>

                            )}
                        </div>
                    )

                    }


                </div>

            </>

        </DefaultLayout>
    )
}