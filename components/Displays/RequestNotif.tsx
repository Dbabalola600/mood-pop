


import { MouseEventHandler } from "react"
import { CgProfile } from "react-icons/cg"

type MyProps = {
    image: any
    name: any
    Acceptclicky: MouseEventHandler<HTMLDivElement> | any,
    Declineclicky: MouseEventHandler<HTMLDivElement> | any

}


export default function RequestNotif(props: MyProps) {
    return (

        <div
            className="bg-white pt-5 pb-5 px-5 lg:h-[100px] h-[160px] mb-5 rounded-lg"
        >
            {props.image === undefined ? (
                <div
                    className="avatar"
                >
                    <div className="  rounded-full flex ">
                        <CgProfile className="w-[50px] h-[50px] text-gray-600" />
                    </div>

                </div>


            ) : (
                <div
                    className="avatar"
                >
                    <div className="w-16 rounded-full">
                        <img
                            src={`${props.image}`}
                            alt="User Profile Pic"
                        // className="rounded-badge"
                        // style={{ maxWidth: "50%",  }}
                        />

                    </div>

                </div>
            )}

            <span
                className="mx-5 text-black lg:text-[25px] text-center mb-5"
            >
                {props.name}
            </span>


            <div
                className="grid lg:grid-cols-2  lg:w-1/2 text-center gap-4 float-right grid-cols-2 w-full"
            >

                <div
                    className="float-right bg-green-500 text-white  p-3 rounded-full cursor-pointer dark:bg-green-500 dark:text-white hover:bg-black "
                    onClick={props.Acceptclicky}
                >
                    Accept
                </div>

                <div
                    className="float-right bg-red-500 text-white  p-3 rounded-full cursor-pointer dark:bg-red-500 dark:text-white hover:bg-black "
                    onClick={props.Declineclicky}
                >

                    Decline


                </div>

            </div>



        </div>

    )
}