import mongoose, { Schema, model, models } from 'mongoose';




const postSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // unique: true,
        ref: "User"
    },
    post: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,

    },
    expiresAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 86400 // 24 hours
    }
},
    {
        timestamps: true
    }

)


const Post = models.Post || model("Post", postSchema)
export default Post