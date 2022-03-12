export const recommend = (req, res) => 
    res.render("home", {pageTitle: "Home"});

export const see = (req, res) => {
    console.log(req.params);
    return res.render("watch", {pageTitle: "Watch Video"});
}

export const edit = (req, res) => {
    console.log(req.params);
    return res.render("editVideo", {pageTitle: "Edit Video"});
}
export const search = (req, res) => res.send("Search");

export const upload = (req, res) => res.send("Upload");

export const deleteVideo = (req, res) => {
    console.log(req.params);
    return res.send(`Delete Video #${req.params.id}`);
}