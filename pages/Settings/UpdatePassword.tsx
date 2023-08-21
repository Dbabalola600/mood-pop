import { FormEventHandler, useState } from "react";
import CusHead from "../../components/Displays/CusHead";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import TextInput from "../../components/inputs/TextInput";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";





export default function UpdatePassword() {
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()
    const token = getCookie("USER")
       


    const woop: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)

        const form = e.currentTarget.elements as any

        const body = {
            id: token,
            o_pass: form.item(0).value,
            n_pass: form.item(1).value,

        }
        const response = await fetch("/api/User/Settings/UpdatePassword", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status === 200) {
                    router.push("/DashBoard")
                } if (res.status === 401) {
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
                <div
                    className=""
                >
                    <CusHead
                        title="Update Password"
                    />
                </div>
                <form
                    className="mt-5 "
                    onSubmit={
                        woop
                    }
                >
                    <div
                        className="mb-5 space-y-5"
                    >

                        <div className="mx-auto  w-full ">
                            <TextInput
                                placeholder="*****"
                                name="Old Password"
                                type='text'

                            />
                        </div>

                        <div className="mx-auto  w-full ">
                            <TextInput
                                placeholder="******"
                                name="New Password"
                                type='text'

                            />
                        </div>
                    </div>
                    <div className=" w-full  space-y-2">

                        <button className="w-full btn-primary btn  text-white"
                            type="submit"

                        >
                            {isLoading ? "Loading..." : "Change password"}


                        </button>


                    </div>

                </form>


            </div>


        </DefaultLayout>
    )
}