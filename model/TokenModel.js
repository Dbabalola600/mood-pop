import mongoose, { Schema, model, models } from 'mongoose';



const tokenSchema = new Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    token: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["reset_password", "verify_email", "refresh_token"]
    },
    expiresAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 600 // 10 minutes grace period
    }
});


const Token = models.Token || model("Token", tokenSchema)
export default Token