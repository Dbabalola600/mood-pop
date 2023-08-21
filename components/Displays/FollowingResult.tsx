import { MouseEventHandler } from "react"
import { CgProfile } from "react-icons/cg"

type MyProps = {
    image: any
    name: any
    clicky: MouseEventHandler<HTMLDivElement> | any

}


export default function FollowingResult(props: MyProps) {
    return (

        <div
            className="bg-white pt-5 pb-5 px-5 h-[100px] mb-5 rounded-lg"
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
                className="mx-5 text-black lg:text-[25px]"
            >
                {props.name}
            </span>


            <div
                className="float-right bg-primary text-white  p-3 rounded-full cursor-pointer dark:bg-primary dark:text-white hover:bg-black "
            >
                <button
                    onClick={props.clicky}
                >
                    Delete
                </button>

            </div>
        </div>

    )
}