import mongoose, { Schema, model, models } from 'mongoose';


const RequestSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // unique: true,
        ref: "User"
    },
    new: {
        type: Array,
        required: true
    },
    // approved: {
    //     type: Array,
    //     required: true
    // }
},
    { timestamps: true }
)

const Request = models.Request || model("Request", RequestSchema)
export default Request


