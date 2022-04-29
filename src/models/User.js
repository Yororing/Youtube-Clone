import mongoose from "mongoose";
import bcrypt from "bcrypt";

// DB User DataType
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    avatarUrl: String,
    socialOnly: { type: Boolean, default: false },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String,  },
    location: String,
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" }],
});

// Hashing Password
userSchema.pre('save', async function() {

    // Just change Password save will hash
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 5);
    }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;

