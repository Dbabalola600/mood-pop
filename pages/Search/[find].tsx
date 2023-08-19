import { useRouter } from "next/router";
import DefaultLayout from "../../components/Layout/DefaultLayout";




export default function Found() {
    const router = useRouter()
    let ssd = router.query


    return (
        <DefaultLayout>
            <div>



                Found {ssd.find}
            </div>


        </DefaultLayout>
    )
}