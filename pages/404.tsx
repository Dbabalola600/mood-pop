import UnLogged from "../components/Layout/UnLogged";
import Image from "next/image";
import err404 from "../public/err404.svg"
export default function Custom404() {
    return (

        <UnLogged>
            <div
            >

                <div
                    className='grid lg:grid-cols-2  grid-cols-1 '
                >

                    <div
                        className="w-full min-h-screen  space-y-[50px] py-20 px-10 bg-white text-black text-base md:text-xl md:rounded-xl"

                    >

                        <div
                            className="text-black text-center text-3xl lg:mx-auto"
                        >
                            Looks like this page isn&apos;t Availabe yet
                            <div
                            className="cursor-pointer text-primary underline underline-offset-auto"
                            onClick={() => history.back()}
                            >
                                Retrace your Steps?
                            </div>
                        </div>

                    </div>



                    {/* image */}
                    <div
                        className='lg:block hidden bg-primary '
                    >
                        <div
                            className=' flex justify-center my-40 '
                        >
                            <Image
                                src={err404}
                                className='rounded-sm'
                            />


                        </div>

                    </div>


                </div>





            </div>


        </UnLogged>


    )
}