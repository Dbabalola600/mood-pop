import { useRouter } from "next/router";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import { getCookie } from "cookies-next";
import { FormEventHandler, useEffect, useState } from "react";
import CusHead from "../../components/Displays/CusHead";
import TextInput from "../../components/inputs/TextInput";
import LargeTextInput from "../../components/inputs/LargeTextInput";
import ErrToast from "../../components/Displays/ErrToast";
import GoodToast from "../../components/Displays/GoodToast";




export default function JournalNote() {
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()
    const token = getCookie("USER")
    const [showtoast, settoast] = useState({ message: "", show: false })
    const [showtoast2, settoast2] = useState({ message: "", show: false })



    const newadd: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)

        const form = e.currentTarget.elements as any

        const body = {
            id: token,
            title: form.item(0).value,
            content: form.item(1).value
        }

        const response = await fetch("/api/Journal/NewNote", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status === 200) {
                    settoast({ message: " message", show: true })
                  
                    router.push("/Journal")

                } else {
                    settoast2({ message: " message", show: true })

                    //display error
                }
            }).catch(err => {
                console.log(err)
            })




        setLoading(false)

    }
    useEffect(() => {
        if (showtoast.show) {
            setTimeout(() => {
                settoast({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast.show])


    useEffect(() => {
        if (showtoast2.show) {
            setTimeout(() => {
                settoast2({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast2.show])
    return (
        <DefaultLayout>
            <div>


                <CusHead
                    title="Put something down why don't you?"
                />
                <div
                className="mt-2"
                >
                    only you get to see this ❤️
                </div>

                {showtoast.show && <GoodToast message='Sucessful' />}

{showtoast2.show && <ErrToast message="Something went wrong" />}

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