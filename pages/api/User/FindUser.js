import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";





export default async function GetUser(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        // const { find } = JSON.parse(req.body)

        // console.log(find)


        let find = req.query.find


        const target = await User.find({ UserName: { $regex: find, $options: "i" } })
        if (target[0] === undefined) {
            const target = await User.find({ email: { $regex: find, $options: "i" } })
            return res.status(200).json(

                target
            )
        } else {
            return res.status(200).json(

                target

            )
        }



    } catch (error) {

        console.log(error);
        res.json({ error })
    }


}
