import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";
import { setCookie } from "cookies-next"





export default async function Login(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { user, password } = JSON.parse(req.body)


        const existingUser = await User.findOne({ UserName: user })



        if (existingUser === null) {
            const existingUser_mail = await User.findOne({ email: user })
            if (existingUser_mail === null) {
                return res.status(402).json("not a user")
            } else {
                if (password === existingUser_mail.password) {
                    setCookie("USER", existingUser_mail._id, { req, res, maxAge: 86400 })

                    return res.status(200).json(existingUser_mail)
                } else {
                    return res.status(401).json("incorrect password")
                }
            }
        } else {
            //check password 

            if (password === existingUser.password) {

                setCookie("USER", existingUser._id, { req, res, maxAge: 86400 })


                return res.status(200).json(existingUser)
            } else {
                return res.status(401).json("incorrect password")
            }
        }

    }
}