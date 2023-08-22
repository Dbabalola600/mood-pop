import connectMongo from "../../../utils/connectMongo";
import Notification from "../../../model/Notification";
import User from "../../../model/UserModel";




export default async function CountNotification(req, res) {
    try {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        // const { user } = JSON.parse(req.body)

        let user = req.query.user

        console.log(user)

        //person recieving notification
        const Person = await Notification.findOne({ userId: user })

        //get details of request notifications

        const ReqNotif = []

        for (let i = 0; i < Person.unread.length; i++) {
            if (Person.unread[i].category === "request") {
                ReqNotif.push(Person.unread[i])
            }
        }


        console.log(ReqNotif)

        return res.status(200).json(ReqNotif.length)

    } catch (error) {

        console.log(error);
        res.json({ error })
    }

}