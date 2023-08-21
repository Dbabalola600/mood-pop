import connectMongo from "../../../utils/connectMongo";
import Request from "../../../model/Request";
import User from "../../../model/UserModel";






export default async function GetAllRequest(req, res) {

    // console.log(req.method)
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { user } = JSON.parse(req.body)

        const Person = await Request.find({ userId: user })

        const IdStruct = []




        for (let i = 0; i < Person.length; i++) {
            IdStruct.push(Person[i].from)
        }

        // const CoolStruct = await Promise.all(IdStruct.map(async (peep) => {
        //     const Peeps = await User.findById(peep)

        //     return (
        //         {
        //             peep,
        //             user: Peeps
        //         }
        //     )
        // }))



        const CoolStruct = await Promise.all(Person.map(async (peep) => {
            const Peeps = await User.findById(peep.from)
            return ({
                peep,
                user: Peeps
            })
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