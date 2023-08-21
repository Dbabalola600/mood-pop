import Post from "../../../model/PostModel";
import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";
import Follow from "../../../model/FollowModel";



export default async function NewPost(req, res) {
    if (req.method === "POST") {


        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { userId } = JSON.parse(req.body)





        const Userfollowing = await Follow.findOne({ userId: userId })

        //ids of people following 

        const FollowId = []
        for (let i = 0; i < Userfollowing.following.length; i++) {
            FollowId.push(Userfollowing.following[i])
        }

        // const FollowPost = await Promise.all(FollowId.map(async (peep) => {
        //     const Peeps = await Post.find({ userId: peep })
        //     return Peeps
        // }))

        const FollowPost = await Post.find({ userId: { $in: FollowId } });






      
        return res.status(200).json(FollowPost)


    } else {
        return (
            res.status(400).json("error")
        )
    }
} 