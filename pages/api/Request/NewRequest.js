import connectMongo from "../../../utils/connectMongo";
import Request from "../../../model/Request";
import User from "../../../model/UserModel";




export default async function NewRequest(req, res) {

    // console.log(req.method)
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { user, id } = JSON.parse(req.body)

        const Person = await Request.findOne({ userId: user })


        const newRequest = await Request.updateOne(
            { _id: Person._id },
            { $push: { new: { $each: [id], $position: 0 } } },
            { new: true }
        ).exec()

        return res.status(200).json(Person)



    } else {
        return res.status(400).json(
            "wrong request"
        );
    }
}