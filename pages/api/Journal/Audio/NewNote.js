import connectMongo from "../../../../utils/connectMongo";
import AudioJournal from "../../../../model/AudioJournalModel";



export default async function NewNote(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');




        const { id, title, content } = JSON.parse(req.body)
        //genrate id's
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijlkmnopqrstuvwxyz0123456789"
        function generateId(length) {
            let result = "";
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength))
            }
            return result
        }



        // get date
        const FullDate = new Date()
        let month = FullDate.toLocaleString('default', { month: 'long' })
        let day = FullDate.getDate()
        let year = FullDate.getFullYear()
        let ShortDate = day + "-" + month + "-" + year

        const user = await AudioJournal.findOne({ userId: id })

        const update ={ 
            // page:{
                id: generateId(24) ,
                title: title ,
                content: content ,
                Date:  ShortDate
            // }
            
        }



        const newNote = await AudioJournal.updateOne(
            { _id: user._id },
            {
                $push: {
                    note: {
                        $each: [
                          update
                        ], $position: 0
                    }
                }
            },
            { new: true }
        ).exec()

    

        // const newUpdate = await Journal.findById(user._id).updateOne({note: update})
        
        return res.status(200).json(user.note)

    } else {
        return (
            res.status(400).json("error")
        )
    }
}
