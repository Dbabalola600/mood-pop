import connectMongo from "../../../utils/connectMongo";
import Follow from "../../../model/FollowModel";





export default async function GetFollow(req, res) {

    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id } = JSON.parse(req.body)

        const user = await Follow.findOne({ userId: id })


        return res.json(user)


    } else {
        return res.status(400).json("wrong request")
    }
}