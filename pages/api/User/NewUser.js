import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";
import Follow from "../../../model/FollowModel";



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
                    isVerified: false
                })


                if (newbie._id === undefined) {
                    return res.status(401).json("couldn't create")
                } else {
                    const fll = await Follow.create({
                        userId: newbie._id
                    })
                }



                return res.status(200).json({ newbie });
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


