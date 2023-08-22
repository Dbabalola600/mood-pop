import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";
import Follow from "../../../model/FollowModel";
import Notification from "../../../model/Notification";
import Request from "../../../model/Request";




export default async function MegaFollow(req, res) {

    // console.log(req.method)
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        //user is person logged in
        //id is the other persons id 
        //req_id is the request id 

        const { user, id, req_id } = JSON.parse(req.body);


        //new follow
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





        //mark notification as read 

        const Person = await Notification.findOne({ userId: user })

        const update = {
            category: "request",
            id: req_id
        }


        //moving to read
        const newNote = await Notification.updateOne(
            { _id: Person._id },
            {
                $push: {
                    read: {
                        $each: [
                            update
                        ], $position: 0
                    }
                }
            },
            { new: true }
        ).exec()

        //moving from unread

        let UnRead = []
        for (let i = 0; i < Person.unread.length; i++) {
            if (id !== Person.unread[i].id) {
                UnRead.push(Person.unread[i])
            }
        }


        const newUnread = await Notification.findById(Person._id).updateOne({ unread: UnRead })

        // accepting the request/ deleting
        const delRequest = await Request.findByIdAndDelete({ _id: req_id })



        return res.status(200).json(person_following);
    } catch (error) {
        console.error('An error occurred:', error);
        return res.status(500).json('Internal server error');
    }
}