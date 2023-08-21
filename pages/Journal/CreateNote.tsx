import { useRouter } from "next/router";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import { getCookie } from "cookies-next";
import { FormEventHandler, useState } from "react";
import CusHead from "../../components/Displays/CusHead";
import TextInput from "../../components/inputs/TextInput";
import LargeTextInput from "../../components/inputs/LargeTextInput";




export default function JournalNote() {
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()
    const token = getCookie("USER")

    
    const newadd: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)

        const form = e.currentTarget.elements as any

        const body = {
            id :token,
            title:form.item(0).value,
            content: form.item(1).value
        }

        const response = await fetch("/api/Journal/NewNote", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status === 200) {
                    router.push("/Journal")

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
            <div>


                <CusHead
                    title="Put something down why don't you?"
                />


                <form
                    className=""
                    onSubmit={newadd}
                >
                    <div
                    className=" pb-5 space-y-5"
                    >

                        <TextInput
                        name="Title"
                        placeholder="Give your entry a catchy name"
                        type="text"
                        />

                        <LargeTextInput
                        title="Content"
                        placholder="write to your hearts content"
                        />

                    </div>






                    <div className=" w-full  space-y-2">

                        <button className="w-full btn-primary btn  text-white"
                            type="submit">
                            {isLoading ? "Loading..." : "Create"}


                        </button>


                    </div>
                </form>

            </div>


        </DefaultLayout>
    )
}