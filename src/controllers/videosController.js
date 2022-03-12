export const recommend = (req, res) => res.send("Recommended Videos");

export const see = (req, res) => {
    console.log(req.params);
    return res.send(`Watch Video #${req.params.id}`);
}

export const edit = (req, res) => {
    console.log(req.params);
    return res.send(`Edit Video #${req.params.id}`);
}
export const search = (req, res) => res.send("Search");

export const upload = (req, res) => res.send("Upload");

export const deleteVideo = (req, res) => {
    console.log(req.params);
    return res.send(`Delete Video #${req.params.id}`);
}