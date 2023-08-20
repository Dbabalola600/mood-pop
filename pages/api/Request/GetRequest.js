import connectMongo from "../../../utils/connectMongo";
import Request from "../../../model/Request";
import User from "../../../model/UserModel";






export default async function GetRequest(req, res) {

    // console.log(req.method)
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { user } = JSON.parse(req.body)

        const Person = await Request.findOne({ userId: user })

        const IdStruct = []

        for (let i = 0; i < Person.new.length; i++) {
            IdStruct.push(Person.new[i])
        }

        const CoolStruct = await Promise.all(IdStruct.map(async (peep) => {
            const Peeps = await User.findById(peep)

            return (Peeps)
        }))




        return res.status(200).json(
            CoolStruct
        )



    } else {
        return res.status(400).json(
            "wrong request"
        );
    }
}