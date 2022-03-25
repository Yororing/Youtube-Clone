import mongoose from "mongoose";

// DB DataType
const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date,
    hashtags: [{ type: String }],
    meta: {
        views:Number,
        rating:Number,
    },
});

const videoModel = mongoose.model("Video", videoSchema);

export default videoModel;