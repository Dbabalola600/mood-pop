import connectMongo from "../../../utils/connectMongo";
import Follow from "../../../model/FollowModel";
import User from "../../../model/UserModel";





export default async function Unfollow(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { user, id } = JSON.parse(req.body)



        const person_following = await Follow.findOne({ userId: id })

        const person_to_follow = await Follow.findOne({ userId: user })


        //remove following
        const removeFollowingId = []

        for (let i = 0; i < person_following.following.length; i++) {
            if (person_following.following[i].toString() !== user) {
                removeFollowingId.push(person_following.following[i])
            }
        }

        const newFollowing = await Follow.findById(person_following._id).updateOne({ following: removeFollowingId })

        //remove follower
        const removeFollowerId = []

        for (let i = 0; i < person_to_follow.followers.length; i++) {
            if (person_to_follow.followers[i].toString() !== id) {
                removeFollowerId.push(person_to_follow.followers[i])
            }
        }

        const newFollowers = await Follow.findById(person_to_follow._id).updateOne({ followers: removeFollowerId })

        return res.json("done")


    } else {
        return res.status(400).json("wrong request")
    }
}