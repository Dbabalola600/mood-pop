import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";





export default async function ResetPassword(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { token, pass, cpass } = JSON.parse(req.body)


        const Person = await User.findOne({ email: token })


        if (pass === cpass) {


            const Update = await User.findById(Person._id).updateOne({password: pass})
            return res.status(200).json("done")


        } else {
            return res.status(202).json("no match")
        }

    } else {
        return (
            res.status(400).json("error")
        )
    }


}