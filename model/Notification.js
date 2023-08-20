import mongoose, { Schema, model, models } from 'mongoose';




const NotificationSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // unique: true,
        ref: "User"
    },
    read: {
        type: Array,
        required: true,
        kind: {
            category: {
                type: String
            },
            id: {
                type: String
            }
        }
    },
    unread: {
        type: Array,
        required: true,
        kind: {
            category: {
                type: String
            },
            id: {
                type: String
            }
        }
    }
},
    { timestamps: true }
)

const Notification = models.Notification || model("Notification", NotificationSchema)
export default Notification


