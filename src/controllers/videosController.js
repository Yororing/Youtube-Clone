let videos = [
    {
        title: "Video #1",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id: 1,
    },
    {
        title: "Video #2",
        rating: 3,
        comments: 1,
        createdAt: "15 minutes ago",
        views: 22,
        id: 2,
    },
    {
        title: "Video #3",
        rating: 2,
        comments: 0,
        createdAt: "33 minutes ago",
        views: 33,
        id: 3,
    }
];

export const recommend = (req, res) => {
    return res.render("home", {pageTitle: "Home", videos});
}
    
export const watch = (req, res) => {
    const { id } = req.params;
    const video = videos[id-1];
    console.log(req.params);
    return res.render("watch", {pageTitle: `Watch ${video.title}`, video});
};

export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id-1];
    console.log(req.params);
    return res.render("editVideo", {pageTitle: `Edit ${video.title}`, video});
};

//Modify Videos
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id-1].title = title;
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
    const newVideo = {
        title: req.body.videoTitle,
        rating: 0,
        comments: 0,
        createdAt: "just now",
        views: 0,
        id: videos.length + 1,
    }
    videos.push(newVideo);
    return res.redirect("/");
};