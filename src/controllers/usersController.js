import userModel from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import { redirect } from "express/lib/response";

export const getJoin = (req, res) => {
    return res.render("join", {pageTitle : "Join"});
}

export const postJoin = async (req, res) => {
    // console.log(req.body);
    const pageTitle = "Join";
    const { name, username, email, password, password2, location } = req.body;
    const Exists = await userModel.exists({ $or: [{username}, {email}] });

    // Confirming Password
    if(password !== password2) {
        // Send Status Code to Browser can accept error
        return res.status(400).render("join", { 
            pageTitle, 
            errorMessage: "Password confirmation does't match." 
        });
    }

    // Checking Username Or Email Duplication
    if(Exists) {
        return res.status(400).render("join", { 
            pageTitle, 
            errorMessage: "This username/email is already taken." 
        });
    }

    // Create User Account
    try {
        await userModel.create({
            name,
            username,
            email,
            password,
            location,
        });
        return res.redirect("/login");
    } catch(error) {
        return res.status(400).render("join", { 
            pageTitle, 
            errorMessage: error._message, 
        });
    }
};

export const getLogin = (req, res) => 
    res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = "Login";

    // Check Account Exist
    // Get User Object From DB
    const user = await userModel.findOne({ username, socialOnly: false });
    if(!user){
        return res.status(400).render("login", {
            pageTitle, 
            errorMessage: "This username doesn't exists.",
        });
    }

    // Check if PassWord Correct
    const checkingPassword = await bcrypt.compare(password, user.password);
    if(!checkingPassword){
        return res.status(400).render("login", {
            pageTitle, 
            errorMessage: "Incorrect password.",
        });
    }

    // Make Cookies
    req.session.loggedIn = true;
    req.session.user = user;

    // If Log In success go Homepage
    return res.redirect("/");
}

// Login With GitHub ID
export const startGithubLogin = (req, res) => {
    const baseURL = `https://github.com/login/oauth/authorize?`;
    // Config Objects
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email",
    };
    // Get Parameters From Config Objects
    const params = new URLSearchParams(config).toString();

    // Input Parameters to GitHub Login URL
    const loginURL = `${baseURL}${params}`;
    return res.redirect(loginURL);
};

// Callback GitHub
export const finishGithubLogin = async (req, res) => {
    // GitHub Token
    const baseURL = "https://github.com/login/oauth/access_token";

    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    console.log(config);
    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseURL}?${params}`;
    const tokenRequest = await ( 
        await fetch(finalURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        })
    ).json();

    if("access_token" in tokenRequest) {
        // Using Access Token to Access GitHub API
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();
        // console.log(userData);
        
        // Get User's Email Address
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();
        // console.log(emailData);
        
        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified === true
        );
        
        // If doesn't get Email Address go to login page
        if(!emailObj) {
            return res.redirect("/login");
        }
        // If User doesn't exist
        let existUser = await userModel.findOne({ email: emailObj.email });
        // Create User Account
        if(!existUser) {
                existUser = await userModel.create({
                    name: userData.name ? userData.name: userData.login,
                    avatarUrl: userData.avatar_url,
                    socialOnly: true,
                    username: userData.login,
                    email: emailObj.email,
                    password: "",
                    location: userData.location,
                }
            );
        }
        req.session.loggedIn = true;
        req.session.user = existUser;
        return res.redirect("/");

        // console.log(email);
    } else {
        return res.redirect("/login");
    }
};

export const logout = (req, res) => {
    // Log Out Destroy Session
    req.session.destroy();
    return res.redirect("/");
}

export const getEdit = (req, res) => {
    res.render("edit-profile", { pageTitle: "Edit Profile", });
}

export const postEdit = async (req, res) => {
    
    const { 
        // Get Id From Request
        session: { 
            user: { _id, avatarUrl, email: sessionEmail, username: sessionUsername },
        }, 
        // Get Information From Edit Form
        body: { name, username, email, location },
        // Get file From Edit Form, Upload folder
        file,
    } = req;
    
    // Duplication Check
    let searchParam = [];
    
    // Check Email is Updated?
    if(sessionEmail !== email) {
        searchParam.push({ email });
    }

    // Check Username is Updated?
    if(sessionUsername !== username) {
        searchParam.push({ username });
    }

    // If get changes Check Duplication
    if(searchParam.length > 0) {
        const foundUser = await userModel.findOne( { $or: searchParam });
        console.log(foundUser);

        // If get Duplication send Error Message
        if(foundUser && foundUser._id.toString() !== _id) {
            return res.status(400).render("edit-profile", {
                pageTitle: "Edit Profile",
                errorMessage: "This username/email is already taken.",
            });
        }
    }

    // Update Profile On DB
    const updateUser = await userModel.findByIdAndUpdate
        (_id, {
            avatarUrl: file ? file.path : avatarUrl,
            name,
            username,
            email,
            location,
        },
        {
            // Session Update
            new: true
        },
    );
    
    req.session.user = updateUser;

    res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {
    // Prevent Forced Connection to Change Password If social Login
    if(req.session.user.socialOnly === true) {
        return res.redirect("/");
    }
    return res.render("users/change-password", { pageTitle: "Change Password" })
};

export const postChangePassword = async (req, res) => {
    // Get ID from session & Get Password from change-password.pug
    const { 
        session: { 
            user: { _id, password },
        },
        body: {
            oldPassword, newPassword,confirmNewPassword 
        },
    } = req;

    // Check Old Password is Correct
    const checkingPassword = await bcrypt.compare(oldPassword, password);
    if(!checkingPassword) {
        return res.status(400).render("users/change-password", { pageTitle: "Change Password" , errorMessage: "The current password is incorrect" });
    }

    // Check New Password
    if(newPassword !== confirmNewPassword) {
        return res.status(400).render("users/change-password", { pageTitle: "Change Password" , errorMessage: "The password doesn't match the confirmation" });
    }

    // Update New Password
    const user = await userModel.findById(_id);
    user.password = newPassword;
    user.save();

    // Update Session
    req.session.user.password = user.password;

    return res.redirect("/users/logout");
};

// Get User Profile From id
export const see = async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if(!user) {
        return res.status(404).render("404", { pageTitle: "User not Found", });
    }

    return res.render("users/profile", { pageTitle: `${user.username}'s Profile`, user});
};