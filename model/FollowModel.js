import mongoose, { Schema, model, models } from 'mongoose';



const FollowSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,

        ref: "User"
    },
    followers:{
        type: Array,
        required: true,
    },
    following:{
        type: Array,
        required: true,
    }
},
{
    timestamps: true
}
)

const Follow = models.Follow || model("Follow", FollowSchema)
export default Follow