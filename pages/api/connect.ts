import connectMongo from "../../utils/connectMongo";
import type { NextApiRequest, NextApiResponse } from 'next'


type Data ={

}


export default async function connect (
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
    console.log("connecting")
    await connectMongo()
    console.log("connected")
    res.status(200).json({message: "connected"})
}