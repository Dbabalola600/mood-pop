import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import JournalFeed from "../../components/Displays/JournalFeed";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import { useRouter } from "next/router";
import useSWR from "swr";



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
    const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());


    const { data, error } = useSWR(
        `/api/Journal/GetJournalNote?userId=${token}&find=${ssd.id}`,
        fetcher
    )

    console.log(data)



    return (
        <DefaultLayout>
            <div>



                <div
                    className="grid grid-cols-2 lg:text-4xl text-xl bg-specpurple p-5"
                >
                    <div
                        className="text-black"
                    >
                        Title:{" "} {data?.title}
                    </div>

                    <div
                        className="text-right text-white"
                    >
                        Date:{" "}{data?.Date}
                    </div>

                </div>


                <div
                    className="bg-white p-5 mt-5 text-black rounded-xl"
                >
                    {data?.content}

                </div>



            </div>


        </DefaultLayout>
    )
}