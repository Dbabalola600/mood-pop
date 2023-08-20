import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";
import Journal from "../../../model/JournalModel";



export default async function GetJournal(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { id } = JSON.parse(req.body)

        const JN = await Journal.findOne({ userId: id })


        return res.status(200).json(JN.note)


    } else {
        return (
            res.status(400).json("error")
        )

    }
}