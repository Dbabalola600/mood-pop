import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";





export default async function GetUser(req, res) {
    if (req.method === "POST") {


        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { id } = JSON.parse(req.body)


        const person = await User.findById(id)


        return res.status(200).json(person)


    } else {
        return (
            res.status(400).json("error")
        )
    }
}