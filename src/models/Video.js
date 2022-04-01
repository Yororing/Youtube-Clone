import mongoose from "mongoose";

// DB DataType
const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, trim: true },
    createdAt: { type: Date , required: true, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views:{ type: Number , default: 0, required: true },
        rating:{ type: Number , default: 0, required: true },
    },
});

const videoModel = mongoose.model("Video", videoSchema);

export default videoModel;