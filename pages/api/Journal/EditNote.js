import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";
import Journal from "../../../model/JournalModel";


export default async function EditNote(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id, NId, title, content } = JSON.parse(req.body)



        // get date
        const FullDate = new Date()
        let month = FullDate.toLocaleString('default', { month: 'long' })
        let day = FullDate.getDate()
        let year = FullDate.getFullYear()
        let ShortDate = day + "-" + month + "-" + year

        const user = await Journal.findOne({ userId: id })


        const UserJournal = await Journal.findOne({ userId: id })


        const UserNote = []
        for (let i = 0; i < UserJournal.note.length; i++) {
            if (NId === UserJournal.note[i].id) {
                UserNote.push(UserJournal.note[i])
            }
        }

        let Update = {
            id: NId,
            title: title,
            content: content,
            Date: ShortDate
        }


        const NormNotes = []

        for (let i = 0; i < UserJournal.note.length; i++) {
            if (UserJournal.note[i].id !== NId) {
                NormNotes.push(UserJournal.note[i])
            }
        }

        const UpdateJournal = await Journal.findById(UserJournal._id).updateOne({ note: [...NormNotes, Update] })

        return res.status(200).json(UpdateJournal)


    } else {
        return (
            res.status(400).json("error")
        )
    }
}