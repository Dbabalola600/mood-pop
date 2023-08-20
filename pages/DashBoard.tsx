import { useEffect, useState } from "react";
import DefaultLayout from "../components/Layout/DefaultLayout";
import { getCookie } from "cookies-next";
import { CgProfile } from "react-icons/cg"
import LoadFeed from "../components/Loading/LoadFeed";



type User = {
    _id: string,
    UserName: string,
    email: string,
    isVerified: string,
    image: string
}


export default function DashBoard() {
    const [isLoading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    const showinfo = async () => {
        setLoading(true)
        const token = getCookie("USER")
        const body = {
            id: token
        }

        const response = await fetch("/api/User/GetUser", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as User
        setUser(response)
        setLoading(false)
    }

    useEffect(() => {
        showinfo()

    }, [])


    // console.log(user?.image)



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

                            DashBoard {user?.UserName}
                        </div>

                    )}
                </div>

            </>

        </DefaultLayout>
    )
}