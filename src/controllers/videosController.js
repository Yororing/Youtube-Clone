import videoModel from "../models/Video";

// Create Video Controllers
export const recommend = async (req, res) => {
    //Using MongoDB Query Promise
    try {
        const videosPromise = await videoModel.find({});
        console.log(videosPromise);
        return res.render("home", { pageTitle: "Home", videosPromise });
    } catch {
        // Error Message
        return res.render("VideoFind-error");
    }
};

export const watch = (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    return res.render("watch", );
};

export const getEdit = (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    return res.render("editVideo", );
};

//Modify Videos
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    console.log(req.body);
    return res.redirect(`/videos/${id}`);
};

export const search = (req, res) => res.send("Search");

export const upload = (req, res) => res.send("Upload");

export const deleteVideo = (req, res) => {
    console.log(req.params);
    return res.send(`Delete Video #${req.params.id}`);
};

export const getUpload = (req, res) => {
    return res.render("Upload", {pageTitle: "Upload Video"});
};

//Add Video 
export const postUpload = async (req, res) => {
    const { videoTitle, description, hashtags } = req.body;
    // Update On Database
    await newVideo.create({
        title,
        description,
        createdAt: Date.now(),
        hashtags: hashtags.split(",").map(word => `#${word}`),
        meta: {
            views: 0,
            rating: 0,
        },
    });
    console.log(dbVideo);
    return res.redirect("/");
};