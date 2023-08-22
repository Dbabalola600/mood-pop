import CusHead from "../../components/Displays/CusHead";
import DefaultLayout from "../../components/Layout/DefaultLayout";





export default function SeekHelp() {
    return (
        <DefaultLayout>
            <div>

                <div>

                    <CusHead
                        title="Seek Help"
                    />
                </div>


                <div
                    className="mb-6 text-black text-2xl font-bold mt-5"
                >
                    Hotlines
                    <div
                        className="w-[150px] bg-primary h-1 rounded-full"
                    />
                </div>

            </div>
        </DefaultLayout>
    )
}