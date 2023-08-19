import Link from "next/link";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import UnLogged from "../../components/Layout/UnLogged";
import TextInput from "../../components/inputs/TextInput";
import { useState } from "react";




export default function ForgotPassword() {

    const [isLoading, setLoading] = useState(false)

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



                            <form
                                className="w-full min-h-screen  space-y-[50px] py-20 px-10 bg-white text-black text-base md:text-xl md:rounded-xl"
                            //   onSubmit={
                            //     login
                            //   }
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
                                        name="Emial"
                                        type='text'

                                    />
                                </div>










                                <div className=" w-full  space-y-2">

                                    <button className="w-full btn-primary btn  text-white"
                                        type="submit"

                                    >
                                        {isLoading ? "Loading..." : "SIGN IN"}


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
            </>

        </UnLogged>
    )
}