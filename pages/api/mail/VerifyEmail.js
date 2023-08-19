import { sendEmail } from "../../../utils/sendgrid";




export default async (req, res) => {

    const { method } = req;

    const { mail, title } = JSON.parse(req.body)

    console.log(title)


    try {
        await sendEmail(
            //sending to
            mail,
            //subject
            "Mood Verification",
            ///context
            "please input the following to verify your account:  " + title
        );
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }


}
