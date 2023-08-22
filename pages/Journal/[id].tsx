import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import JournalFeed from "../../components/Displays/JournalFeed";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import { useRouter } from "next/router";



type Journal = {
    id: string,
    title: string,
    content: string,
    Date: string
}

export default function Journal() {
    const [isLoading, setLoading] = useState(false)
    const [journal, setJournal] = useState<Journal | null>(null)
    const token = getCookie("USER")
    const router = useRouter()


    const ssd = router.query
    const showinfo = async () => {
        setLoading(true)

        const body = {
            id: token,
            NId: ssd.id
        }

        const response = await fetch("/api/Journal/GetNote", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Journal
        setJournal(response)





        setLoading(false)
    }

    useEffect(() => {
        showinfo()

    }, [])


    return (
        <DefaultLayout>
            <div>



                <div
                    className="grid grid-cols-2 lg:text-4xl text-xl bg-specpurple p-5"
                >
                    <div
                        className="text-black"
                    >
                        Title:{" "} {journal?.title}
                    </div>

                    <div
                        className="text-right text-white"
                    >
                        Date:{" "}{journal?.Date}
                    </div>

                </div>


                <div
                className="bg-white p-5 mt-5 text-black rounded-xl"
                >
                    {journal?.content}

                </div>



            </div>


        </DefaultLayout>
    )
}