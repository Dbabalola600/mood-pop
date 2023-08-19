import { Schema, model, models } from 'mongoose';





const UserSchema = new Schema({
    image: {
        data: Buffer,
        contentType: String,
        // type: String
    },
    UserName: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    role: {
        type: String,
        required: true,
        trim: true,
        enum: ["user", "admin"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    }
},
    { timestamps: true }
)



const User = models.User || model("User", UserSchema);
export default User 