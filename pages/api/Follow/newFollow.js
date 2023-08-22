import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";
import Follow from "../../../model/FollowModel";






export default async function NewFollow(req, res) {

    // console.log(req.method)
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { user, id } = JSON.parse(req.body);

        const person_following = await Follow.findOne({ userId: id });
        const person_to_follow = await Follow.findOne({ userId: user });

        // Adding user to following
        const newFollowing = await Follow.updateOne(
            { _id: person_following._id },
            { $push: { following: { $each: [user], $position: 0 } } },
            { new: true }
        ).exec();

        // Update the receiver's followers
        const newFollower = await Follow.updateOne(
            { _id: person_to_follow._id },
            { $push: { followers: { $each: [id], $position: 0 } } },
            { new: true }
        ).exec();

        return res.status(200).json(person_following);
    } catch (error) {
        console.error('An error occurred:', error);
        return res.status(500).json('Internal server error');
    }
}