import Link from "next/link";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import UnLogged from "../../components/Layout/UnLogged";
import TextInput from "../../components/inputs/TextInput";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import forgot_password from "../../public/forgot_password.svg"
import Image from "next/image";
import ErrToast from "../../components/Displays/ErrToast";
import GoodToast from "../../components/Displays/GoodToast";


type Data = {
    token: string
}


export default function ForgotPassword() {
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)
    const [showtoast, settoast] = useState({ message: "", show: false })
    const [showtoast2, settoast2] = useState({ message: "", show: false })

    const gogoEmail: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)



        const form = e.currentTarget.elements as any

        const body = {
            email: form.item(0).value,

        }


        const response = await fetch("/api/token/newPasswordToken", { method: "POST", body: JSON.stringify(body) })
            .then(async res => {
                if (res.status === 200) {
                    //send the email to verify
                    const data = await res.json() as Data;

                    const body2 = {
                        mail: form.item(0).value,
                        title: data.token
                    }
                    const MailRes = await fetch("/api/mail/ResetPassword", { method: "POST", body: JSON.stringify(body2) })
                        .then(res => {
                            if (res.status === 200) {
                                settoast({ message: " message", show: true })
                                router.push("/ForgotPassword/EnterToken")
                            } else {
                                settoast2({ message: " message", show: true })
                            }
                        }).catch(err => {
                            console.log(err)
                        })

                }else{
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


    return (
        <UnLogged>
            <>
                <div
                >

                    <div
                        className='grid lg:grid-cols-2  grid-cols-1 '
                    >



                        {/* form */}
                        <div>

                            {showtoast.show && <GoodToast message='Sucessful' />}

                            {showtoast2.show && <ErrToast message="Something went wrong" />}


                            <form
                                className="w-full min-h-screen  space-y-[50px] py-20 px-10 bg-white text-black text-base md:text-xl md:rounded-xl"
                                onSubmit={
                                    gogoEmail
                                }
                            >


                                <div
                                    className='text-center font-extrabold text-primary text-7xl'
                                >
                                    Forgot Password
                                    <div
                                        className='font-normal text-2xl'
                                    >

                                    </div>
                                </div>

                                <div className="mx-auto  w-full ">
                                    <TextInput
                                        placeholder="Email"
                                        name="Enter email associated with your account"
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
                                        Remeber Password?{" "}
                                        <span className=" hover:underline text-primary">
                                            <Link href="/">Login</Link>
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
                                    src={forgot_password}
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