import CusHead from "../../components/Displays/CusHead";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import Requests from "./Requests";




export default function Notifications() {
    return (
        <DefaultLayout>
            <div>
                <div>
                    <CusHead
                        title="Notifications"
                    />
                </div>

                <hr className="mt-5 " />

                <div
                className="mt-5"
                >

                    <div>
                        <div
                            className="text-black text-xl"
                        >
                            Requets
                        </div>
                        <div
                            className=" bg-primary h-1 w-1/2"
                        />
                    </div>
                    <Requests />
                </div>


            </div>


        </DefaultLayout>
    )
}