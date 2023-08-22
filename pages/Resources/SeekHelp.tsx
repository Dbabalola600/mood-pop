import CusHead from "../../components/Displays/CusHead";
import DefaultLayout from "../../components/Layout/DefaultLayout";





export default function SeekHelp() {


    const numbers = [
        { number: "+234 906 254 4446", name: "Mental Health Support Initiative (MHSI)" },
        { number: "0706 624 3252", name: "Mentally Aware Nigeria Initiative (MANI)" },
        { number: "0909 291 2292", name: "She Writes Woman Helpline" },
  
    
    ]


    const mails = [
        { mail: "info@mentallyaware.org", name: "Mentally Aware Nigeria Initiative (MANI)", },
        { mail: " info@shewriteswoman.org", name: "She Writes Woman", },
        { mail: "info@hellomentalhealth.com", name: "Hello Mental Health", },
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
                    className="mb-6 break-words text-black text-lg font-bold mt-5"
                >
                    Hotlines📞
                    <div
                        className="w-[150px] bg-primary h-1 rounded-full"
                    />
                    {numbers.map((info, index) => (
                        <div
                        key={index}
                        >
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
                    className="mb-6 text-black break-words text-lg font-bold mt-5"
                >
                    Mails ✉️
                    <div
                        className="w-[150px] bg-primary h-1 rounded-full"
                    />
                    {mails.map((info, index) => (
                        <div
                        key={index}
                        >
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