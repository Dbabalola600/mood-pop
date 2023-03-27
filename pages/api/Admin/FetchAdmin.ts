import connectMongo from "../../../utils/connectMongo";
import Admin from "../../../models/Admin";
import { NextApiRequest, NextApiResponse } from "next";


type Data = {
    message?: string
}

export default async function (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        console.log("connecting to mongo")
        await connectMongo()
        console.log("connected to mongo")
  


        const user = await Admin.findById( req.body )


        res.status(200).json(user)
    } else {
        res.json( {message:"wrong request" })
    }
}
