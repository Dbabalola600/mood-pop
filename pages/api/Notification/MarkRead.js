import connectMongo from "../../../utils/connectMongo";
import Notification from "../../../model/Notification";
import User from "../../../model/UserModel";




export default async function MarkRead(req, res) {
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


        const newUnread = await Notification.findById(Person._id).updateOne({unread:UnRead })
        
        return res.status(200).json(Person)

    } else {
        return res.status(400).json("wrong request")
    }


}