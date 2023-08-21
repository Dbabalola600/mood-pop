import Link from "next/link";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import CusHead from "../../components/Displays/CusHead";





export default function Settings() {




    const update = [
        { title: "Password", link: "/Settings/UpdatePassword", sub: "change your password" },
        { title: "Email", link: "/Settings/UpdateEmail", sub: "Update your email" },
        { title: "Profile Picture", link: "/Settings/UpdateAvatar", sub: "Update your display picture" },
        { title: "Username", link: "/Settings/UpdateUserName", sub: "Update your username" }
    ]


    return (
        <DefaultLayout>
            <div>



                <div>
                    <CusHead
                        title="Settings"
                    />
                </div>


                <div
                    className=" pt-10"
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
                                        className="bg-white rounded-lg px-5 pt-5 hover:bg-primary cursor-pointer"
                                    >
                                        {"icon"}
                                        <span
                                            className="px-2 text-black text-lg"
                                        >
                                            {info.title}
                                            <div
                                                className="text-specgray text-sm"
                                            >
                                                {info.sub}
                                            </div>
                                        </span>

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