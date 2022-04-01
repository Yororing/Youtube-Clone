import videoModel from "../models/Video";

// Create Video Controllers
export const recommend = async (req, res) => {
    //Using MongoDB Query Promise
    const videosPromise = await videoModel.find({});
    console.log(videosPromise);
    return res.render("home", { pageTitle: "Home", videosPromise });
};

export const watch = async (req, res) => {
    const { id } = req.params;
    const findByIdVideo = await videoModel.findById(id);
    if(!findByIdVideo) {
        return res.render("watch", { pageTitle: "Video not Found." });
    }
    return res.render("watch", { pageTitle: findByIdVideo.title, findByIdVideo });
};

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const findByIdVideo = await videoModel.findById(id);
    if(!findByIdVideo) {
        return res.render("404", { pageTitle: "Video not Found.", });
    }
    return res.render("editVideo", { pageTitle: `Edit: ${findByIdVideo.title}`, findByIdVideo });
};

//Modify Videos
export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const findByIdVideo = await videoModel.exists({_id:id});
    if(!findByIdVideo) {
        return res.render("404", { pageTitle: "Video not Found.", });
    }
    await videoModel.findByIdAndUpdate(id, {
        title, 
        description, 
        hashtags: videoModel.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
};

export const search = (req, res) => res.send("Search");

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    // Delete Video
    await videoModel.findByIdAndDelete(id);
    return res.redirect("/");
};

export const getUpload = (req, res) => {
    return res.render("Upload", {pageTitle: "Upload Video"});
};

//Add Video 
export const postUpload = async (req, res) => {
    const { videoTitle, description, hashtags } = req.body;
    // Update On Database
    try {
        const newVideo = await videoModel.create({
            title: videoTitle,
            description,
            hashtags: videoModel.formatHashtags(hashtags),
        });
        console.log(newVideo);
        return res.redirect("/");
    } catch(error){
        // Call Upload Page and Add Error Message
        return res.render("Upload", {
            pageTitle: "Upload Video", 
            errorMessage: error._message,
        });
    }
};