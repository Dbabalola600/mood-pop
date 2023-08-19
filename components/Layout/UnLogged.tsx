import Head from "next/head";
import Footer from "../Navigation/Footer";

export default function UnLogged({ children }: { children?: JSX.Element }) {
    return (
        <>

            <div
            >

                <div
                    className="w-full min-h-screen  bg-primary text-black text-base md:text-xl"
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







            <div>

                <Footer />
            </div>

        </>
    )
}
