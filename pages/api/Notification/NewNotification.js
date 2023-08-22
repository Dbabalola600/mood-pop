import connectMongo from "../../../utils/connectMongo";
import Notification from "../../../model/Notification";
import User from "../../../model/UserModel";
import { sendMail } from "../../../utils/mailService";



export default async function NewNotification(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { user, cat, id } = JSON.parse(req.body)

        //person recieving notification
        const Person = await Notification.findOne({ userId: user })


        //notification details
        const update = {
            category: cat,
            id: id  // request id 
        }


        const newNote = await Notification.updateOne(
            { _id: Person._id },
            {
                $push: {
                    unread: {
                        $each: [
                            update
                        ], $position: 0
                    }
                }
            },
            { new: true }
        ).exec()



        //send email 
        //person to recieve mail 
        const rec = await User.findOne({ _id: user })



        await sendMail(
            "New Request",
            rec.email,
            "You just recieved a new follow request"
        )


        return res.status(200).json(Person.unread)

    } else {
        return res.status(400).json("wrong request")
    }


}