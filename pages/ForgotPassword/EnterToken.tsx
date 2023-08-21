import Link from "next/link";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import UnLogged from "../../components/Layout/UnLogged";
import TextInput from "../../components/inputs/TextInput";
import { FormEventHandler, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import Image from "next/image";
import web_development from "../../public/web_development.svg"
import GoodToast from "../../components/Displays/GoodToast";
import ErrToast from "../../components/Displays/ErrToast";


export default function ForgotPassword() {
    const router = useRouter()

    const [isLoading, setLoading] = useState(false)
    const token = getCookie("TEMPMAIL")
    const [showtoast, settoast] = useState({ message: "", show: false })
    const [showtoast2, settoast2] = useState({ message: "", show: false })


    const woop: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)

        const form = e.currentTarget.elements as any

        const body = {
            token: form.item(0).value
        }


        const response = await fetch("/api/token/VerifyPasswordReset", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status === 200) {
                    settoast({ message: " message", show: true })
                    router.push("/ForgotPassword/ResetPassword")
                } if (res.status === 202) {
                    settoast2({ message: " message", show: true })

                    //token doesnt exist
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
        <UnLogged>
            <>
                <div
                >

                    <div
                        className='grid lg:grid-cols-2  grid-cols-1 '
                    >

                        {showtoast.show && <GoodToast message='Sucessful' />}

                        {showtoast2.show && <ErrToast message="Something went wrong" />}


                        {/* form */}
                        <div>
                            <form
                                className="w-full min-h-screen  space-y-[50px] py-20 px-10 bg-white text-black text-base md:text-xl md:rounded-xl"
                                onSubmit={
                                    woop
                                }
                            >


                                <div
                                    className='text-center font-extrabold text-primary text-7xl'
                                >
                                    Put it in here
                                    <div
                                        className='font-normal text-2xl'
                                    >

                                    </div>
                                </div>

                                <div className="mx-auto  w-full ">
                                    <TextInput
                                        placeholder="Enter code"
                                        name="Enter code sent"
                                        type='text'

                                    />
                                </div>










                                <div className=" w-full  space-y-2">

                                    <button className="w-full btn-primary btn  text-white"
                                        type="submit"

                                    >
                                        {isLoading ? "Loading..." : "Reset Password"}


                                    </button>

                                    <h6 className=" md:text-xl w-full">
                                        Did not recieve code?{" "}
                                        <span className=" hover:underline text-primary">
                                            <Link href="/ForgotPassword">Use another Email</Link>
                                        </span>
                                    </h6>
                                </div>




                            </form>


                        </div>


                        {/* image */}
                        <div
                            className='lg:block hidden bg-primary '
                        >
                            <div
                                className=' flex justify-center my-40 '
                            >
                                <Image
                                    src={web_development}
                                    className='rounded-sm'
                                />


                            </div>

                        </div>


                    </div>





                </div>
            </>

        </UnLogged>
    )
}