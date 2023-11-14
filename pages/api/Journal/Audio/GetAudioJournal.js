import connectMongo from "../../../../utils/connectMongo";
import AudioJournal from "../../../../model/AudioJournalModel";


export default async function GetAudioJournal(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const {id} = JSON.parse(req.body)

        const audi = await AudioJournal.findOne({userId: id})

        return res.status(200).json(audi)
    } else {
        return (
            res.status(400).json("error")
        )

    }
}