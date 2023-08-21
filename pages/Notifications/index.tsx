import CusHead from "../../components/Displays/CusHead";
import DefaultLayout from "../../components/Layout/DefaultLayout";




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

                <div>
                    Requests
                </div>


            </div>


        </DefaultLayout>
    )
}