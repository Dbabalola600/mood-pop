import Link from "next/link"

type MyProps = {
    title: any,
    date: any
    id: any
}

export default function JournalFeed(props: MyProps) {
    return (
        <div
            className="cursor-pointer hover:text-white hover:bg-primary bg-white rounded-t-md roundedb-md   mb-2 pb-2 "
        >
            <Link
                href={`/Journal/${props.id}`}

            >


                <div
                    className=" mx-5 pt-2"
                >
                    <div
                        className="text-black "
                    >
                        Title: {props.title}
                    </div>

                    <div
                        className="text-specgray"
                    >
                        Date: {props.date}
                    </div>

                </div>




            </Link>
        </div>

    )
}