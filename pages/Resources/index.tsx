import Link from "next/link";
import CusHead from "../../components/Displays/CusHead";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import { BsPeopleFill } from "react-icons/bs";
import {FaBookAtlas} from "react-icons/fa6"



export default function Index() {

const resource =[
    { title: "Seek Help", link: "/Resources/SeekHelp", sub: "reach out to professionals", icon: "BsPeopleFill" },
    { title: "Books", link: "/Resources/Books", sub: "a list of books that may help improve your mental state", icon: "FaBookAtlas" },
          
]


    return (
        <DefaultLayout>
            <div>
                <div>
                    <CusHead
                        title="Resources"
                    />

<div
                    className=" pt-10"
                >
                    {resource.map((info, index) => (
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
                                                {info.icon === "BsPeopleFill" && <BsPeopleFill />}
                                               {info.icon === "FaBookAtlas" && <FaBookAtlas/>}
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
            </div>
        </DefaultLayout>
    )
}