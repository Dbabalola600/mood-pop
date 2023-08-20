import { FormEventHandler, useState } from "react";
import CusHead from "../../components/Displays/CusHead";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import TextInput from "../../components/inputs/TextInput";
import LargeTextInput from "../../components/inputs/LargeTextInput";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";





export default function Post() {
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()
    const token = getCookie("USER")

    const newadd: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)

        const form = e.currentTarget.elements as any

        const body = {
            userId :token,
            category:form.item(0).value,
            post: form.item(1).value
        }

        const response = await fetch("/api/Post/NewPost", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status === 200) {
                    router.push("/DashBoard")

                } else {
                    //display error
                }
            }).catch(err => {
                console.log(err)
            })




        setLoading(false)

    }




    return (
        <DefaultLayout>
            <>
                <div>

                    <CusHead
                        title="New Post"
                    />



                    <form
                        className=" "
                        onSubmit={newadd}
                    >

                        <div
                            className="pb-5 space-y-5"
                        >

                            <TextInput
                                name="Mood"
                                placeholder="How are you feeling?"
                                type="text"

                            />

                            <LargeTextInput
                                title="Content"
                                placholder="Express yourself..."
                            />

                        </div>




                        <div className=" w-full  space-y-2">

                            <button className="w-full btn-primary btn  text-white"
                                type="submit">
                                {isLoading ? "Loading..." : "Post"}


                            </button>


                        </div>



                    </form>
                </div>

            </>
        </DefaultLayout>
    )
}