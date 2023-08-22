import Head from "next/head";
import Link from "next/link";
import SideBar from "../Navigation/SideBar";
import Footer from "../Navigation/Footer";
import NavBar from "../Navigation/NavBar";
import BottomNavBar from "../Navigation/BottomNavBar";
import { getCookie, hasCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";


type User = {
    _id: string,
    UserName: string,
    email: string,
    isVerified: boolean,
    image: string
}

function DefaultLayout({ children }: { children?: JSX.Element }) {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    const showinfo = async () => {


        const token = getCookie("USER")
        const body = {
            id: token
        }

        const response = await fetch("/api/User/GetUser", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as User
        setUser(response)


        if (response.isVerified === false) {
            router.push("/Verification/VerifyEmail")
        }
    }




    useEffect(() => {
        showinfo()

    }, [])


    function checkUser() {
        const userCheck = hasCookie("USER")
        if (userCheck == false) {
            router.push("/")
        }
    }




    useEffect(() => {
        checkUser()
    }, [])



    return (
        <>
            <div className="grid lg:min-h-screen grid-rows-header bg-secondary ">
                <div
                // className="lg:hidden"
                >
                    <NavBar />
                </div>


                <div className="grid md:grid-cols-sidebar ">
                    <SideBar />
                    <div
                        className=" min-h-screen px-10 py-5"
                    >
                        <main>
                            <Head>
                                <title>MOOD</title>
                                <meta name="description" content="Anti Social Social Media" />
                                <link rel="icon" href="/mood.ico" />
                            </Head>

                            {children}
                        </main>

                    </div>

                </div>





            </div>
            <BottomNavBar />
            <div>

                <Footer />
            </div>

        </>
    )
}

export default DefaultLayout;