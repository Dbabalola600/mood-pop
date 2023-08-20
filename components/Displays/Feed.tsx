import { CgProfile } from "react-icons/cg"

type FeedProps = {
    image: any,
    name: string | any,
    date: string | any,
    content: string | any
}


export default function Feed(props: FeedProps) {
    return (
        <div
            className="bg-white rounded-t-md rounded-b-xl mb-5 "
        >

            <div
                className="mx-5 mb-5 pt-5 "
            >
                {props.image === undefined ? (
                    <div className="flex justify-center items-center ">
                        <div className="avatar">
                            <div className="w-40 h-40 text-center rounded-full flex justify-center items-center">
                                <CgProfile className="w-32 h-32 text-gray-600" />
                            </div>
                        </div>

                        <span
                            className="mx-6 pt-10 text-black "
                        >

                            {props.name}
                        </span>
                    </div>
                ) : (
                    <div
                        className=""
                    >
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                                <img
                                    src={`${props.image}`}
                                    alt="User Profile Pic"
                                // className="rounded-badge"
                                // style={{ maxWidth: "50%",  }}
                                />

                            </div>

                            <span
                                className="mx-6 pt-5 text-black  "
                            >

                                {props.name}
                            </span>


                        </div>
                        <span
                            className=" float-right text-right bottom-6 text-sm lg:text-base "
                        >
                            {props.date}
                        </span>


                    </div>
                )}





            </div>


            <div
                className="bg-specpurple text-secondary lg:text-4xl rounded-b-xl h-full pb-10 mx-auto px-10 text-center pt-5 justify-center breakwords"
            >

                {props.content}

            </div>

        </div>
    )
}