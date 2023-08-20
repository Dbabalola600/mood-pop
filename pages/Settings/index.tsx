import Link from "next/link";
import DefaultLayout from "../../components/Layout/DefaultLayout";





export default function Settings() {




    const update = [
        { title: "Password", link: "/Settings/UpdatePassword" },
        { title: "Email", link: "/Settings/UpdateEmail" },
        { title: "Profile Picture", link: "/Settings/UpdateAvatar" },
        { title: "Username", link: "/Settings/UpdateUserName" }
    ]


    return (
        <DefaultLayout>
            <div>



                Settings


                <div
                    className=""
                >
                    {update.map((info, index) => (
                        <div
                            key={index}
                        >

                            <div
                            className=" mb-5"
                            >
                                <Link
                                    href={`${info.link}`}
                                >

                                    <div
                                    className="bg-white hover:bg-primary cursor-pointer"
                                    >
                                    {info.title}
                                    </div>
                                
                                </Link>

                            </div>


                        </div>
                    ))}

                </div>
            </div>
        </DefaultLayout>
    )
}