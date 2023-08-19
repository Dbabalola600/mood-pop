import Head from "next/head";
import Link from "next/link";
import SideBar from "../Navigation/SideBar";
import Footer from "../Navigation/Footer";
import NavBar from "../Navigation/NavBar";


function DefaultLayout({ children }: { children?: JSX.Element }) {
    return (
        <>
            <div className="grid lg:min-h-screen grid-rows-header bg-secondary ">
                <div
                    className="lg:hidden"
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

            <div>
                <Footer />
            </div>

        </>
    )
}

export default DefaultLayout;