import { useEffect, useState } from "react";
import JournalFeed from "../../components/Displays/JournalFeed";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import { getCookie } from "cookies-next";
import Link from "next/link";
import LoadFeed from "../../components/Loading/LoadFeed";
import CusHead from "../../components/Displays/CusHead";
import JournalSearchBar from "../../components/inputs/JournalSearch";
import searchbutton from "../../public/searchbutton.svg"
import Image from "next/image"
import { useRouter } from "next/router";
import { BsPencilSquare } from "react-icons/bs";

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
    const router = useRouter()


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

                <div
                    className=" grid grid-cols-2"
                >

                    <div>
                        <CusHead
                            title="Journal"
                        />
                    </div>


                    <div
                        className="float-right text-right  "
                    >

                        <div
                            className=" "
                        >
                            <BsPencilSquare
                                onClick={() => router.push("/Journal/CreateNote")}
                                className="cursor-pointer float-right text-[40px]"
                            />
                        </div>



                        {/* <span
                            className="mx-5"
                        >

                            <Image
                                onClick={() => router.push("/Journal/Search")}
                                src={searchbutton}
                                className="cursor-pointer "
                                height={"40px"}
                                width={40}


                            />
                        </span> */}
                    </div>

                </div>


                <div
                    className="mt-5"
                >
                    <JournalSearchBar />
                </div>

                {isLoading ? (
                    <div>

                        <LoadFeed />
                    </div>
                ) : (

                    <div>


                        {journal[0] === undefined ? (
                            <div
                                className="mt-10"
                            >
                                make sum
                            </div>
                        ) : (


                            <div>
                                <div
                                    className="mb-6 text-black text-2xl font-bold"
                                >
                                    Your Journal Entries
                                    <div
                                        className="w-[150px] bg-primary h-1 rounded-full"
                                    />
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-6">





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

                            </div>

                        )}





                    </div>

                )}




            </div>


        </DefaultLayout>
    )
}