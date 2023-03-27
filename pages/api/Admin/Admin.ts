import connectMongo from "../../../utils/connectMongo";
import Admin from "../../../models/Admin";
import { NextApiRequest, NextApiResponse } from "next";


type Data = {
    message?: string
    firstname?: string,
    lastname?: string,
    AdminId?: string,
    password?: string,
}

// type UserData ={
//      firstname: string,
//     lastname: string,
//     AdminId: string,
//     password: string,
// }

export default async function New(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        console.log("connecting to mongo")
        await connectMongo()
        console.log("connected to mongo")

        const {
            firstname,
            lastname,
            AdminId,
            password
        } = req.body

        const user = await Admin.create(req.body)


        res.json(user)
    }
    if (req.method === "GET") {
        console.log("connecting to mongo")
        await connectMongo()
        console.log("connected to mongo")

        const users = await Admin.find()

        return res.json({ users })
    }
    else {
        res.json({ message: "wrong request" })
    }

}
