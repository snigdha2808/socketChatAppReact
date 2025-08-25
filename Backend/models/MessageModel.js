import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
        maxlength: 1000,
        trim: true,
        validate: {
            validator: (value) => {
                return value.length > 0;
            },
            message: "Message cannot be empty",
        }
    },
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
    }
}, {
    timestamps: true
});

const Message = mongoose.model("Message", messageSchema);

export default Message;