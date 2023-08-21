import Link from "next/link";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import CusHead from "../../components/Displays/CusHead";
import { MdPassword } from "react-icons/md"
import { AiFillMail } from "react-icons/ai"
import { ImProfile } from "react-icons/im"
import { CgRename } from "react-icons/cg"


export default function Settings() {




    const update = [
        { title: "Password", link: "/Settings/UpdatePassword", sub: "change your password", icon: "MdPassword" },
        { title: "Email", link: "/Settings/UpdateEmail", sub: "Update your email", icon: "AiFillMail" },
        { title: "Profile Picture", link: "/Settings/UpdateAvatar", sub: "Update your display picture", icon: "ImProfile" },
        { title: "Username", link: "/Settings/UpdateUserName", sub: "Update your username", icon: "CgRename" }
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
                                        <div className="flex items-center">
                                            <div className="text-[40px] pt- w-[10px] ">
                                                {info.icon === "MdPassword" && <MdPassword />}
                                                {info.icon === "AiFillMail" && <AiFillMail />}
                                                {info.icon === "ImProfile" && <ImProfile />}
                                                {info.icon === "CgRename" && <CgRename />}
                                            </div>
                                            <div className="px-10 text-black  font-bold text-lg">
                                                {info.title}
                                            </div>
                                        </div>
                                        <div
                                            className="text-specgray text-sm"
                                        >
                                            {info.sub}
                                        </div>



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