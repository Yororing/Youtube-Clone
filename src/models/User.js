import mongoose from "mongoose";
import bcrypt from "bcrypt";

// DB User DataType
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    avatarUrl: String,
    socialOnly: { type: Boolean, default: false },
    username: { type: String, required: true, unique: true },
    password: { type: String,  },
    name: { type: String, required: true },
    location: String,
});

// Hashing Password
userSchema.pre('save', async function() {
    // Typing Password
    // console.log("Typing Password", this.password);
    this.password = await bcrypt.hash(this.password, 5);
    // Hashed Password
    // console.log("Hashed Password", this.password);
})

const userModel = mongoose.model("User", userSchema);

export default userModel;

