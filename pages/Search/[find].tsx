import { useRouter } from "next/router";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import { useEffect, useState } from "react";
import LoadFeed from "../../components/Loading/LoadFeed";




type User = {
    _id: string,
    UserName: string,
    email: string,
    isVerified: string,
    image: string
}




export default function Found() {
    const [isLoading, setLoading] = useState(false)
    const [user, setUser] = useState<User[]>([])

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

        console.log(response)

        setLoading(false)
    }





    useEffect(() => {
        search()

    }, [])

    return (
        <DefaultLayout>
            <div>
                Found {ssd.find}

                {isLoading ? (
                    <div>
                        <LoadFeed />
                    </div>
                ) : (
                    <div>

                        {user[0]?.email}
                        {user[0]?.UserName}

                    </div>
                )}

            </div>


        </DefaultLayout>
    )
}