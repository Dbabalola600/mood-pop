import { useRouter } from "next/router";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import { getCookie } from "cookies-next";
import { FormEventHandler, useState } from "react";
import CusHead from "../../components/Displays/CusHead";
import TextInput from "../../components/inputs/TextInput";





export default function UpdateUserName() {
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()
    const token = getCookie("USER")

    const woop: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)

        const form = e.currentTarget.elements as any

        const body = {
            id: token,
            name: form.item(0).value,


        }
        const response = await fetch("/api/User/Settings/UpdateUserName", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status === 200) {
                    router.push("/DashBoard")
                } if (res.status === 203) {
                    //mismatch
                }
            }).catch(err => {
                console.log(err)
            })
        setLoading(false)
    }
    return (
        <DefaultLayout>
            <div>

                <div>
                    <CusHead
                        title="Update Username"
                    />
                </div>


                <form
                    className="mt-5"
                    onSubmit={
                        woop
                    }

                >
                    <div
                        className="mb-5"
                    >
                        <div className="mx-auto  w-full ">
                            <TextInput
                                placeholder="enter new user name"
                                name="New Username"
                                type='text'

                            />
                        </div>



                    </div>



                    <div className=" w-full  space-y-2">

                        <button className="w-full btn-primary btn  text-white"
                            type="submit"

                        >
                            {isLoading ? "Loading..." : "Change username"}


                        </button>


                    </div>


                </form>



            </div>


        </DefaultLayout>
    )
}