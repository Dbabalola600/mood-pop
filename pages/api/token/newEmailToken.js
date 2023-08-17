import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/UserModel";
import Token from "../../../model/TokenModel";






export default async function NewToken(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { UId } = JSON.parse(req.body)


        // generate tokens for verificaton 
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijlkmnopqrstuvwxyz0123456789"
        function generateToken(length) {
            let result = "";
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength))
            }
            return result
        }



        const GotEm = await Token.create({
            userId: UId,
            token: generateToken(8),
            type: "verify_email"
        })


        res.status(200).json(GotEm)




    } else {
        return (
            res.status(400).json("error")
        )
    }
}
