import type { NextPage } from 'next'
import TextInput from '../components/inputs/TextInput'
import Link from 'next/link'
import Image from 'next/image'
import DefaultLayout from '../components/Layout/DefaultLayout'
import Footer from '../components/Navigation/Footer'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEventHandler, useEffect, useState } from 'react'
import UnLogged from '../components/Layout/UnLogged'
import sign_in from "../public/sign_in.svg"
import GoodToast from '../components/Displays/GoodToast'
import ErrToast from '../components/Displays/ErrToast'

export default function HomePage() {
  const [isLoading, setLoading] = useState(false)
  const [showtoast, settoast] = useState({ message: "", show: false })
  const [showtoast2, settoast2] = useState({ message: "", show: false })
  const [showtoast3, settoast3] = useState({ message: "", show: false })


  const router = useRouter()


  const connect = async () => {


    setLoading(true)
    const response = await fetch("/api/connect", { method: "GET" })
      .then(res => res.json())


    setLoading(false)
  }



  useEffect(() => {
    connect()
  }, [])


  const login: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formElements = e.currentTarget.elements as typeof e.currentTarget.elements & {
      firstname: HTMLInputElement
    }
    const form = e.currentTarget.elements as any

    const body = {
      user: form.item(0).value,
      password: form.item(1).value,
    }

    const response = await fetch("/api/User/login", { method: "POST", body: JSON.stringify(body) })
      .then(res => {
        if (res.status === 200) {
          settoast({ message: " message", show: true })
          router.push("/DashBoard")
        }
        if (res.status === 401) {
          settoast2({ message: " message", show: true })
        }
        if (res.status === 402) {
          settoast2({ message: " message", show: true })
        }else {
          settoast3({ message: " message", show: true })
        }
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

            {showtoast.show && <GoodToast message='Login sucessful' />}

            {showtoast2.show && <ErrToast message="Invalid password or user name" />}
            {/* {showtoast3.show && <GoodToast message="something went wrong" />} */}

            {/* form */}
            <div>



              <form
                className="w-full min-h-screen  space-y-[50px] py-20 px-10 bg-white text-black text-base md:text-xl md:rounded-xl"
                onSubmit={
                  login
                }
              >


                <div
                  className='text-center font-extrabold text-primary dark:text-primary text-7xl'
                >
                  Welcome Back
                  <div
                    className='font-normal text-2xl'
                  >
                    Login and Resume your Anti-Social Adventure
                  </div>
                </div>

                <div className="mx-auto  w-full ">
                  <TextInput
                    placeholder="User Name or Email"
                    name="User Name or Emial"
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

                <a
                >
                  <div
                    className=" hover:underline text-primary text-right mx-auto  pt-5 w-full"
                  >
                    <Link href="/ForgotPassword">Forgot Password?</Link>
                  </div>

                </a>






                <div className=" w-full  space-y-2">

                  <button className="w-full btn-primary btn dark:bg-primary text-white"
                    type="submit"

                  >
                    {isLoading ? "Loading..." : "SIGN IN"}


                  </button>

                  <h6 className=" md:text-xl w-full">
                    New User?{" "}
                    <span className=" hover:underline text-primary dark:text-primary">
                      <Link href="/SignUp">Sign Up</Link>
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
                  src={sign_in}
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


