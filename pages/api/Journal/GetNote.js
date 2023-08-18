import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";
import Journal from "../../../model/JournalModel";



export default async function GetNote(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { id, NId } = JSON.parse(req.body)

        const UserJournal = await Journal.findOne({ userId: id })


        const UserNote = []
        for (let i = 0; i < UserJournal.note.length; i++) {
            if (NId === UserJournal.note[i].id) {
                UserNote.push(UserJournal.note[i])
            }
        }

        // console.log(UserNote[0].content)
        return res.status(200).json(UserNote[0])


    } else {
        return (
            res.status(400).json("error")
        )

    }
}