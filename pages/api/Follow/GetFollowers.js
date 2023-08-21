import connectMongo from "../../../utils/connectMongo";
import Follow from "../../../model/FollowModel";
import User from "../../../model/UserModel";




export default async function GetFollowers(req, res) {

    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id } = JSON.parse(req.body)

        const user = await Follow.findOne({ userId: id })

        console.log(user.followers)
        const fullDet = await User.find({ _id: { $in: user.followers } })

        return res.json(fullDet)


    } else {
        return res.status(400).json("wrong request")
    }
}