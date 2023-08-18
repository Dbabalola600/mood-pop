import type { NextPage } from 'next'
import TextInput from '../components/inputs/TextInput'
import Link from 'next/link'
import Image from 'next/image'
import DefaultLayout from '../components/Layout/DefaultLayout'


export default function SignUp() {
    return (


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
                                {/* {isLoading ? "Loading..." : "SIGN IN"} */}
                                Sign In

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

    )
}


