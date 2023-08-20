import connectMongo from "../../../utils/connectMongo";
import Request from "../../../model/Request";
import User from "../../../model/UserModel";



export default async function AcceptRequest(req, res) {

    // console.log(req.method)
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { user, id } = JSON.parse(req.body)

        const Person = await Request.findOne({ userId: user })

        const IdStruct = []

        for (let i = 0; i < Person.new.length; i++) {
            if (id !== Person.new[i]) {
                IdStruct.push(Person.new[i])
            }

        }

        const NewReqaust = await Request.findById(Person._id).updateOne({ new: IdStruct })



        return res.status(200).json(
            NewReqaust
        )



    } else {
        return res.status(400).json(
            "wrong request"
        );
    }
}