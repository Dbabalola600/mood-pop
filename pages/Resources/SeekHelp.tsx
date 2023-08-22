import CusHead from "../../components/Displays/CusHead";
import DefaultLayout from "../../components/Layout/DefaultLayout";





export default function SeekHelp() {


    const numbers = [
        { number: "+2348055014338", name: "me", }
    ]


    const mails = [
        { mail: "dami600bab@gmail.com", name: "me", }
    ]
    return (
        <DefaultLayout>
            <div>

                <div>

                    <CusHead
                        title="Seek Help"
                    />
                </div>


                <div
                    className="mb-6 text-black text-2xl font-bold mt-5"
                >
                    Hotlines📞
                    <div
                        className="w-[150px] bg-primary h-1 rounded-full"
                    />
                    {numbers.map((info, index) => (
                        <div>
                            <div
                                className="bg-white rounded-lg mt-5 p-5"
                            >

                                <div>
                                    {info.name}
                                </div>
                                <div>
                                    <a href={`tel:${info.number}`}>{info.number} 📞</a>
                                </div>


                            </div>


                        </div>
                    ))}



                </div>


                <div
                    className="mb-6 text-black text-2xl font-bold mt-5"
                >
                    Mails ✉️
                    <div
                        className="w-[150px] bg-primary h-1 rounded-full"
                    />
                    {mails.map((info, index) => (
                        <div>
                            <div
                                className="bg-white rounded-lg mt-5 p-5"
                            >

                                <div>
                                    {info.name}
                                </div>
                                <div>
                                    <a href={`mailto:${info.mail}`}>{info.mail} </a>
                                </div>


                            </div>


                        </div>
                    ))}



                </div>

            </div>
        </DefaultLayout>
    )
}