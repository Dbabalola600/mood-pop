import mongoose, { Schema, model, models } from 'mongoose';


const JournalSchema = new Schema({
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




const Journal = models.Journal || model("Journal", JournalSchema)
export default Journal
