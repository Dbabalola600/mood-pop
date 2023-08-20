import mongoose, { Schema, model, models } from 'mongoose';


const AudioJournalSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // unique: true,
        ref: "User"
    },



    note: {
        type: Array,
        page: {
            // type: String,
            id: {
                type: String
            },
            title: {
                type: String,
            },
            content: {
                type: String,
            },
            Date: {
                type: String,
                // required: true,
                // default: Date.now
            },
        }

    }
},
    { timestamps: true }
)




const AudioJournal = models.AudioJournal || model("AudioJournal", AudioJournalSchema)
export default AudioJournal
