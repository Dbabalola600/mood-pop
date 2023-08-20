import connectMongo from "../../../utils/connectMongo";
import Notification from "../../../model/Notification";
import User from "../../../model/UserModel";




export default async function NewNotification(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { user, cat, id } = JSON.parse(req.body)


        const Person = await Notification.findOne({ userId: user })



        const update = {
            category: cat,
            id: id
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

        return res.status(200).json(Person.unread)

    } else {
        return res.status(400).json("wrong request")
    }


}