import { useEffect, useState } from "react";
import JournalFeed from "../../components/Displays/JournalFeed";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import { getCookie } from "cookies-next";
import Link from "next/link";
import LoadFeed from "../../components/Loading/LoadFeed";


type Journal = {
    id: string,
    title: string,
    content: string,
    Date: string
}

export default function Journal() {
    const [isLoading, setLoading] = useState(false)
    const [journal, setJournal] = useState<Journal[]>([])
    const token = getCookie("USER")


    const showinfo = async () => {
        setLoading(true)

        const body = {
            id: token
        }

        const response = await fetch("/api/Journal/GetJournal", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Journal[]
        setJournal(response)





        setLoading(false)
    }

    useEffect(() => {
        showinfo()

    }, [])


    return (
        <DefaultLayout>
            <div>



                journal
                <Link
                    href={"Journal/CreateNote"}

                >

                    <div

                    >
                        new note in journal
                    </div>
                </Link>

                {isLoading ? (
                    <div>

                        <LoadFeed />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-6">

                        {journal.map((info, index) => (
                            <div
                                key={index}
                            >
                                <JournalFeed
                                    id={info.id}
                                    date={info.Date}
                                    title={info.title}
                                />

                            </div>

                        ))}

                    </div>
                )}




            </div>


        </DefaultLayout>
    )
}