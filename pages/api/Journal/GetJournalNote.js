import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";
import Journal from "../../../model/JournalModel";



export default async function GetJournalNote(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo()
        console.log('CONNECTED TO MONGO');

        let userId = req.query.userId
        let find = req.query.find


        const UserJournal = await Journal.findOne({ userId: userId })
        const UserNote = []

        if (UserJournal === undefined) {
            return res.status(202).json("no user ")
        } else {

            for (let i = 0; i < UserJournal.note.length; i++) {
                if (find === UserJournal.note[i].id) {
                    UserNote.push(UserJournal.note[i])
                }
            }


            return res.status(200).json(UserNote[0])
        }






    } catch (error) {

        console.log(error);
        res.json({ error })
    }
} 