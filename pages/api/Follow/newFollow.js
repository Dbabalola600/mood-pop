import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";
import Follow from "../../../model/FollowModel";






export default async function NewFollow(req, res) {

    // console.log(req.method)
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { user, id } = JSON.parse(req.body)

        const person_following = await Follow.findOne({ userId: id })

        const person_to_follow = await Follow.findOne({ userId: user })


        //adding user to following 
        const FollowingIds = []
        for (let i = 0; i < person_following.following.length; i++) {
            FollowingIds.push(person_following.following[i])
        }

        const newFollowing = await Follow.updateOne(
            { _id: person_following._id },
            { $push: { following: { $each: [user], $position: 0 } } },
            { new: true }
        ).exec()


        // update the reiever's followers
        const FollowersIds = []
        for (let i = 0; i < person_to_follow.followers.length; i++) {
            FollowersIds.push(person_to_follow.followers[i])
        }

        const newFollower= await Follow.updateOne(
            { _id: person_to_follow._id },
            { $push: { followers: { $each: [id], $position: 0 } } },
            { new: true }
        ).exec()


        return res.status(200).json(person_following)



    } else {
        return res.status(400).json(
            "wrong request"
        );
    }
}