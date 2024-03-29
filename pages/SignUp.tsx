import type { NextPage } from 'next'
import TextInput from '../components/inputs/TextInput'
import Link from 'next/link'
import Image from 'next/image'
import DefaultLayout from '../components/Layout/DefaultLayout'
import Footer from '../components/Navigation/Footer'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, FormEventHandler, useEffect } from 'react'
import UnLogged from '../components/Layout/UnLogged'
import welcome_cats from "../public/welcome_cats.svg"
import ErrToast from '../components/Displays/ErrToast'
import GoodToast from '../components/Displays/GoodToast'




type Data = {
    _id: string
}


type TokenData = {
    userId: string,
    token: string
}




export default function SignUp() {
    const router = useRouter()

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [showtoast, settoast] = useState({ message: "", show: false })
    const [showtoast2, settoast2] = useState({ message: "", show: false })
    const [showtoast3, settoast3] = useState({ message: "", show: false })




    const newadd: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)

        const form = e.currentTarget.elements as any

        const body = {
            email: form.item(0).value,
            UserName: form.item(1).value,
            password: form.item(2).value,

        }



        const response = await fetch("/api/User/NewUser", { method: "POST", body: JSON.stringify(body) })
            .then(async res => {
                if (res.status === 255) {
                    //email exists
                    settoast2({ message: " message", show: true })


                } if (res.status === 256) {
                    //user exists
                    settoast3({ message: " message", show: true })

                }
                if (res.status === 200) {
                    //generate token for email verification
                    const data = await res.json() as Data;

                    const body2 = {
                        UId: data._id
                    }
                    console.log(data._id)
                    const TokenRes = await fetch("/api/token/newEmailToken", { method: "POST", body: JSON.stringify(body2) })
                        .then(async res => {
                            if (res.status === 200) {
                                //send the email to the usr 
                                const data = await res.json() as TokenData

                                const body3 = {
                                    mail: form.item(0).value,
                                    title: data.token
                                }
                                const MailRes = await fetch("/api/mail/VerifyEmail", { method: "POST", body: JSON.stringify(body3) })
                                    .then(res => {
                                        if (res.status === 200) {
                                            settoast({ message: " message", show: true })

                                            router.push("/")
                                        }
                                    })
                            }
                        })


                }

                //    else {
                //         settoast({ message: " message", show: true })
                //     }

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




    return (
        <UnLogged>


            <>


                <div

                >

                    <div
                        className='grid lg:grid-cols-2  grid-cols-1 '
                    >

                        {showtoast.show && <GoodToast message='Creation sucessful' />}

                        {showtoast3.show && <ErrToast message="Invalid user name" />}
                        {showtoast2.show && <ErrToast message="Invalid Email" />}


                        {/* form */}
                        <div>



                            <form
                                className="w-full space-y-12 py-20 px-10 min-h-screen  bg-white text-black text-base md:text-xl md:rounded-xl"
                                onSubmit={
                                    newadd
                                }
                            >


                                <div
                                    className='text-center font-extrabold text-primary text-7xl'
                                >
                                    Hello
                                    <div
                                        className='font-normal text-2xl'
                                    >
                                        Sign Up and take control of your your Anti-Social Adventure
                                    </div>
                                </div>

                                <div className="mx-auto  w-full ">
                                    <TextInput
                                        placeholder="Email"
                                        name="Email"
                                        type='email'

                                    />
                                </div>


                                <div className="mx-auto  w-full ">
                                    <TextInput
                                        placeholder="UserName"
                                        name="Username"
                                        type='text'

                                    />
                                </div>


                                <div className="mx-auto w-full ">
                                    <TextInput
                                        placeholder="Password"
                                        name="Password"
                                        type='password'
                                    />
                                </div>




                                <div className=" w-full  space-y-2">

                                    <button className="w-full btn-primary btn  text-white"
                                        type="submit">
                                        {isLoading ? "Loading..." : "Create Account"}


                                    </button>

                                    <h6 className=" md:text-xl w-full">
                                        Already have an account?{" "}
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
                                    src={welcome_cats}
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


