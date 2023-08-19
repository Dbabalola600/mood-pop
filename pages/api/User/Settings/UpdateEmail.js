import connectMongo from "../../../../utils/connectMongo";
import User from "../../../../model/UserModel";


export default async function UserEmail(req, res) {

    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id, email } = JSON.parse(req.body)

        const isUser = await User.findOne({ email: email })

        if (isUser === null) {
            const update = await User.findById(id).updateOne({ email: email })

            return res.status(200).json(update)
        } else {
            return res.status(203).json("user exists")
        }


    } else {

        return (
            res.status(400).json("error")
        )
    }


}