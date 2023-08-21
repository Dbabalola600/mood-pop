
import CusHead from "../../components/Displays/CusHead";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import SearchBar from "../../components/inputs/SearchBar";
import Follower from "./Followers";
import Following from "./Following";



export default function Index() {
    return (
        <DefaultLayout>
            <div>
                <div>
                    <CusHead
                        title={"Here's everyone you follow"}
                    />


                </div>




                <div
                    className=" mt-5"
                >
                    <SearchBar />

                </div>


                <div
                    className="mt-5"
                >

                    <div>
                        <div
                            className="text-black text-xl"
                        >
                           Following
                        </div>
                        <div
                            className=" bg-primary h-1 w-1/2"
                        />
                    </div>
                    <Following />
                </div>


                <div
                    className="mt-5"
                >

                    <div>
                        <div
                            className="text-black text-xl"
                        >
                           Followers
                        </div>
                        <div
                            className=" bg-primary h-1 w-1/2"
                        />
                    </div>
                    <Follower/>
                </div>




            </div>
        </DefaultLayout>
    )
}