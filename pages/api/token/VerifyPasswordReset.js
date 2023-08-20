import connectMongo from "../../../utils/connectMongo";
import Token from "../../../model/TokenModel";
import User from "../../../model/UserModel";




export default async function VerifyPasswordReset(req,res){
    if (req.method === "POST") {


        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const {token} = JSON.parse(req.body)


        const Vartoken = await Token.find({token: token})

        if(Vartoken[0] === undefined){
            return res.status(202).json("token not found")
        }else{
            // const Update = await User.findById(userId).updateOne({isVerified: true})

            return res.status(200).json("verified")
        }

    }else{
        return (
            res.status(400).json("error")
        )
    }
}