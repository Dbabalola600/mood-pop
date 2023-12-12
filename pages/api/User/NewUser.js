import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";
import Follow from "../../../model/FollowModel";
import Journal from "../../../model/JournalModel";
import Notification from "../../../model/Notification";
// import Request from "../../../model/Request";
import AudioJournal from "../../../model/AudioJournalModel";

export default async function NewUser(req, res) {
    if (req.method === "POST") {


        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { email, UserName, password } = JSON.parse(req.body)

        const IsUser = await User.find({ UserName: UserName })
        const IsEmail = await User.find({ email: email })



        if (IsUser[0] === undefined) {
            if (IsEmail[0] === undefined) {
                const newbie = await User.create({
                    email: email,
                    UserName: UserName,
                    password: password,
                    role: "user",
                    isActive: true,
                    isVerified: false, 
                    image: ""
                })


                if (newbie._id === undefined) {
                    return res.status(401).json("couldn't create")
                } else {
                    const fll = await Follow.create({
                        userId: newbie._id
                    })
                    const FillJ = await Journal.create({
                        userId:newbie._id
                    })
                    const Make_Notif = await Notification.create({
                        userId: newbie._id
                    })
                    // const Make_Request = await Request.create({
                    //     userId: newbie._id
                    // })
                    const Make_Audio = await AudioJournal.create({
                        userId: newbie._id
                    })

                }



                return res.status(200).json(newbie );
            } else {
                return res.status(255).json({ message: "email exists" })
            }

        } else {
            return res.status(256).json({ message: "user exists" })
        }


    } else {
        return (
            res.status(400).json("error")
        )
    }
}


