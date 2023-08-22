import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";





export default async function GetUserLink(req, res) {
   try {


        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');




        console.log(req.query.id)
        let name = req.query.id





        const person = await User.findOne({ UserName: name })

        // console.log(person)



        return res.status(200).json(person)


    }  catch (error) {

        console.log(error);
        res.json({ error })
    }

}