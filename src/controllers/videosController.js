import videoModel from "../models/Video";

// Create Video Controllers
export const recommend = async (req, res) => {
    //Using MongoDB Query Promise
    const videosPromise = await videoModel.find({}).sort({createdAt: "desc"});
    //console.log(videosPromise);
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
        return res.status(404).render("404", { pageTitle: "Video not Found.", });
    }
    return res.render("editVideo", { pageTitle: `Edit: ${findByIdVideo.title}`, findByIdVideo });
};

//Modify Videos
export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const findByIdVideo = await videoModel.exists({_id:id});
    if(!findByIdVideo) {
        return res.status(404).render("404", { pageTitle: "Video not Found.", });
    }
    await videoModel.findByIdAndUpdate(id, {
        title, 
        description, 
        hashtags: videoModel.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
};

export const search = async (req, res) => {
    //console.log(req.query);
    const { keywords } = req.query;
    let searchVideos = [];
    if(keywords) {
        // Search
        searchVideos = await videoModel.find({
            title: {
                // Search As Title contains Keywords By MongoDB Query
                $regex: new RegExp(`${keywords}`, "i"),
            },
        });
    }
    return res.render("search", { pageTitle: "Search", searchVideos });
}

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    //console.log(id);
    // Delete Video
    await videoModel.findByIdAndDelete(id);
    return res.redirect("/");
};

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video"});
};

//Add Video 
export const postUpload = async (req, res) => {
    const { path: fileUrl } = req.file;
    const { videoTitle, description, hashtags } = req.body;
    // Update On Database
    try {
        const newVideo = await videoModel.create({
            title: videoTitle,
            description,
            fileUrl,
            hashtags: videoModel.formatHashtags(hashtags),
        });
        //console.log(newVideo);
        return res.redirect("/");
    } catch(error){
        // Call Upload Page and Add Error Message
        return res.status(400).render("Upload", {
            pageTitle: "Upload Video", 
            errorMessage: error._message,
        });
    }
};