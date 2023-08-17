import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";




export default async function NewUser(req, res) {
    if (req.method === "POST") {


        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { email, UserName, password } = JSON.parse(req.body)

        const IsUser = await User.find({ UserName: UserName })
        const IsEmail = await User.find({ email: email })

        console.log(IsEmail[0])

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
                res.status(200).json({ newbie });
            }else{
                res.status(255).json({ message: "email exists" })
            }

        } else {
            res.status(256).json({ message: "user exists" })
        }


    } else {
        return (
            res.status(400).json("error")
        )
    }
}


