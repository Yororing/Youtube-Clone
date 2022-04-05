import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};

    // console.log(res.locals);
    next();
}

export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn) {
        next();
    }
    else {
        return res.redirect("/login");
    }
}

export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn) {
        return next();
    }
    else {
        return res.redirect("/")
    }
}

// Upload avatar img file Middleware Max file size 3MB
export const avatarUpload = multer({
    dest: "uploads/avatars/", limits: { fileSize: 3000000 ,}
});

// Upload video file Middleware Max file size 50MB
export const videoUpload = multer({
    dest: "uploads/videos/", limits: { fileSize: 50000000 ,}
});