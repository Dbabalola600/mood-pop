import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";
import Journal from "../../../model/JournalModel";


export default async function EditNote(req, res) {
    if (req.body === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');




        
    } else {
        return (
            res.status(400).json("error")
        )
    }
}