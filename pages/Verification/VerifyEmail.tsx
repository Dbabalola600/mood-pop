import Link from "next/link";
import CusHead from "../../components/Displays/CusHead";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import ErrToast from "../../components/Displays/ErrToast";
import GoodToast from "../../components/Displays/GoodToast";
import TextInput from "../../components/inputs/TextInput";

type TokenData = {
    userId: string,
    token: string
}


export default function VerifyEmail() {
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)
    const token = getCookie("USER")
    const Mailtoken = getCookie("TEMPMAIL")
    const [showtoast, settoast] = useState({ message: "", show: false })
    const [showtoast2, settoast2] = useState({ message: "", show: false })
    const [showtoast3, settoast3] = useState({ message: "", show: false })
    const [showtoast4, settoast4] = useState({ message: "", show: false })





    const woop: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)

        const form = e.currentTarget.elements as any

        const body = {
            token: form.item(0).value,
            userId: token,

        }


        const response = await fetch("/api/token/VerifyAccountWToken", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status === 200) {
                    settoast({ message: " message", show: true })
                    router.push("/DashBoard")
                } if (res.status === 202) {
                    //mismatch
                    settoast2({ message: " message", show: true })
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

    useEffect(() => {
        if (showtoast3.show) {
            setTimeout(() => {
                settoast3({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast3.show])
    useEffect(() => {
        if (showtoast4.show) {
            setTimeout(() => {
                settoast4({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast4.show])


    const Resend = async () => {
        const body = {
            UId: token
        }
        const TokenRes = await fetch("/api/token/newEmailToken", { method: "POST", body: JSON.stringify(body) })
            .then(async res => {
                if (res.status === 200) {
                    //send the email to the usr 
                    const data = await res.json() as TokenData

                    const body3 = {
                        mail: Mailtoken,
                        title: data.token
                    }
                    const MailRes = await fetch("/api/mail/VerifyEmail", { method: "POST", body: JSON.stringify(body3) })
                        .then(res => {
                            if (res.status === 200) {
                                settoast3({ message: " message", show: true })
                            }
                        })
                } else {
                    settoast4({ message: " message", show: true })
                           
                }
            })



    }


    return (
        <DefaultLayout>
            <>
                <div>
                    <div>
                        <CusHead
                            title="Verify Email"
                        />

                        <div>
                            Enter the code sent to your email
                        </div>
                    </div>



                    {/* form */}
                    <div>

                        {showtoast.show && <GoodToast message='Sucessful' />}

                        {showtoast2.show && <ErrToast message="Invalid Token" />}
                        {showtoast3.show && <GoodToast message='Token Sent' />}
                        {showtoast4.show && <ErrToast message="Please Login Again" />}


                        <form
                            className="w-full min-h-screen  space-y-[50px]  text-black text-base md:text-xl md:rounded-xl"
                            onSubmit={
                                woop
                            }
                        >

                            <div className="mx-auto  w-full ">
                                <TextInput
                                    placeholder="*****"
                                    name="Enter Token"
                                    type='text'

                                />
                            </div>

                            <div className=" w-full  space-y-2">

                                <button className="w-full btn-primary btn  text-white"
                                    type="submit"

                                >
                                    {isLoading ? "Loading..." : "Verify Acoount"}


                                </button>

                                <h6 className=" md:text-xl w-full">
                                    Did not recieve code?{" "}
                                    <span className=" hover:underline text-primary cursor-pointer"
                                        onClick={() => Resend()}>
                                        Resend
                                    </span>
                                </h6>
                            </div>




                        </form>


                    </div>


                </div>
            </>

        </DefaultLayout>
    )
}