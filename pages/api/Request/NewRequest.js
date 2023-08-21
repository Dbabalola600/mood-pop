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

        //person sending request
        const Person = await Request.findOne({ userId: user })


        //person recieving request
        const Person_Rec = await Request.findOne({userId: id})

        //updating the reciever of the request
        // const newRequest = await Request.updateOne(
        //     { _id: Person_Rec._id },
        //     { $push: { new: { $each: [user], $position: 0 } } },
        //     { new: true }
        // ).exec()


        const newRequest = await Request.create({
            userId: id,  //person recieving 
            from: user
        })

        return res.status(200).json(newRequest)



    } else {
        return res.status(400).json(
            "wrong request"
        );
    }
}