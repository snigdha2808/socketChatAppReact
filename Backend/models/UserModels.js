import mongoose from "mongoose";
//template for the user model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmpassword: {
        type: String,
        required: true,
    }
},
{
    timestamps: true,//createdAt and updatedAt
}
)

const User = mongoose.model("User", userSchema);

export default User;