import { sendMail } from "../../../utils/mailService";







const handler = async (req, res) => {
    try {
        const { method } = req;

        const { mail, user } = JSON.parse(req.body)


        console.log(req.body)
        switch (method) {
            case "POST": {


                // console.log(mail)
                //Do some thing
                await sendMail(
                    //subject
                    "New Post",
                    //mail
                    mail,
                    `hey ${user} just made a new post `

                );
                res.status(200).send("Success");
                break;
            }
            case "GET": {
                //Do some thing
                res.status(200).send(req.auth_data);
                break;
            }
            default:
                res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
                res.status(405).end(`Method ${method} Not Allowed`);
                break;
        }
    } catch (err) {
        res.status(400).json({
            error_code: "api_one",
            message: err.message,
        });
    }
};

export default handler;