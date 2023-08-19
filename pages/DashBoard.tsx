import { useEffect, useState } from "react";
import DefaultLayout from "../components/Layout/DefaultLayout";
import { getCookie } from "cookies-next";



type User = {
    _id: string,
    UserName: string,
    email: string,
    isVerified: string
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



    return (
        <DefaultLayout>
            <>
                <div>

                    DashBoard {user?.UserName}
                </div>

            </>

        </DefaultLayout>
    )
}