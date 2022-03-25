import videoModel from "../models/Video";

// Create Video Controllers
export const recommend = async (req, res) => {
    //Using MongoDB Query Promise
    try {
        const videosPromise = await videoModel.find({});
        console.log(videosPromise);
        return res.render("home", { pageTitle: "Home", videos: [] });
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

export const postUpload = (req, res) => {
    //Add Video 
    console.log(req.body);
    return res.redirect("/");
};