import Post from "../../../model/PostModel";
import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";

export default async function NewPost(req, res) {
    if (req.method === "POST") {


        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const {userId} = JSON.parse(req.body)



       const Thing = await Post.find({userId: userId})


        return res.status(200).json(Thing)


    }else{
        return (
            res.status(400).json("error")
        )
    }
} 