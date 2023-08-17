import Post from "../../../model/PostModel";
import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";

export default async function NewPost(req, res) {
    if (req.method === "POST") {


        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const {userId, post, category} = JSON.parse(req.body)



        const NewPost = await Post.create({
            userId: userId,
            post: post,
            category: category
        })


        return res.status(200).json(NewPost)


    }else{
        return (
            res.status(400).json("error")
        )
    }
} 