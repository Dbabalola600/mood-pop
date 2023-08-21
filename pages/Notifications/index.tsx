import CusHead from "../../components/Displays/CusHead";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import Requests from "./Requests";
import Unread from "./Unread";




export default function Notifications() {


    return (
        <DefaultLayout>
            <div>
                <div>
                    <CusHead
                        title="Notifications"
                    />
                </div>

                {/* <hr className="mt-5 " /> */}

                <div
                    className="mt-5"
                >

                    <div>
                        <div
                            className="text-black text-xl"
                        >
                            New Requests
                        </div>
                        <div
                            className=" bg-primary h-1 w-1/2"
                        />
                    </div>
                    <Unread />
                </div>





            </div>


        </DefaultLayout>
    )
}