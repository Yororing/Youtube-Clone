import mongoose from "mongoose";

    // DB DataType
const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, trim: true },
    fileUrl: { type: String, required: true },
    createdAt: { type: Date , required: true, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views:{ type: Number , default: 0, required: true },
        rating:{ type: Number , default: 0, required: true },
    },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

videoSchema.static("formatHashtags", function(hashtags) {
    return hashtags.split(",")
        .map(word => (word.startsWith("#") ? word : `#${word}`));
});

const videoModel = mongoose.model("Video", videoSchema);

export default videoModel;