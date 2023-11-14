import connectMongo from "../../../../utils/connectMongo";
import AudioJournal from "../../../../model/AudioJournalModel";



export default async function GetAudioNote(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo()
        console.log('CONNECTED TO MONGO');


        

    } catch (error) {

        console.log(error);
        res.json({ error })
    }
}