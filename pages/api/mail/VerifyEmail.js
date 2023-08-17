import { sendMail } from "../../../utils/mailService";




const handler = async (req, res) => {
    try {
        const { method } = req;

        const { mail, title } = JSON.parse(req.body)

        console.log(title)
        switch (method) {
            case "POST": {


                // console.log(mail)
                //Do some thing
                await sendMail(
                    //subject
                    "Mood Verification",
                    //mail
                    mail,
                    //context
                   " please input the following "+ title

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