import type { NextPage } from 'next'
import TextInput from '../components/inputs/TextInput'
import Link from 'next/link'
import Image from 'next/image'
import DefaultLayout from '../components/Layout/DefaultLayout'
import Footer from '../components/Navigation/Footer'
import Head from 'next/head'
import { useRouter } from 'next/router'


export default function HomePage() {


  const router = useRouter()


  return (

    <>
      <Head>
        <title>MOOD</title>
        <meta name="description" content="Anti Social Social Media" />
        <link rel="icon" href="/mood.ico" />
      </Head>


      <div
        className="w-full mg:h-full  bg-primary text-black text-base md:text-xl"

      >

        <div
          className='grid lg:grid-cols-2  grid-cols-1 '
        >



          {/* form */}
          <div>



            <form
              className="w-full space-y-12 py-20 px-10 bg-white text-black text-base md:text-xl md:rounded-xl"
            // onSubmit={
            //   login
            // }
            >


              <div
                className='text-center font-extrabold text-primary text-7xl'
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




              <div className=" w-full  space-y-2">

                <div className="w-full btn-primary btn  text-white"
                  // type="submit"
                  onClick={() => router.push("/DashBoard")}
                >
                  {/* {isLoading ? "Loading..." : "SIGN IN"} */}
                  Sign In

                </div>

                <h6 className=" md:text-xl w-full">
                  New User?{" "}
                  <span className=" hover:underline text-primary">
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
              {/* <Image
                src={logo}
                className='rounded-sm'
              /> */}

              <div>
                image
              </div>
            </div>

          </div>


        </div>





      </div>
      <Footer />
    </>
  )
}


