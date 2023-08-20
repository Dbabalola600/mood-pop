import Link from "next/link";
import DefaultLayout from "../../components/Layout/DefaultLayout";




export default function Feed() {
    return (
        <DefaultLayout>
            <div>




                <div>

                    Feed
                </div>



                <div
                    className="cursor pointer hover:bg-red-500"
                >
                    <Link
                        href={"/Post"}
                    >

                        new Post
                    </Link>

                </div>






            </div>
        </DefaultLayout>
    )
}