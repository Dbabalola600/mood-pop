import connectMongo from "../../../../utils/connectMongo";
import User from "../../../../model/UserModel";


export default async function ProfilePic(req, res) {

    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id, pic } = JSON.parse(req.body)


        const update = await User.findById(id).updateOne({image: pic})

        return res.status(200).json("yupp")

    } else {

        return (
            res.status(400).json("error")
        )
    }


}