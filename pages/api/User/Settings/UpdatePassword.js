import connectMongo from "../../../../utils/connectMongo";
import User from "../../../../model/UserModel";


export default async function updatePassword(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { id, n_pass, o_pass } = JSON.parse(req.body)


        const curr_pass = await User.findById(id)

        if(curr_pass.password === o_pass){
            const updatepassword = await User.findById(id).updateOne({ password: n_pass })

            return res.status(200).json({ message: "PASSWORD CHANGED SUCESSFULLY" })
    
    
        }else {
            return res.status(401).json({message:"incorrect password"})
        }

       

    } else {
        return res.status(400).json({
            message: "wrong request",
        });
    }

}

