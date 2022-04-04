import userModel from "../models/User"
import bcrypt from "bcrypt"

export const getJoin = (req, res) => {
    return res.render("join", {pageTitle : "Join"});
}

export const postJoin = async (req, res) => {
    console.log(req.body);
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

export const edit = (req, res) => res.send("Edit User");

export const remove = (req, res) => res.send("Remove User");

export const getLogin = (req, res) => 
    res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = "Login";

    // Check Account Exist
    // Get User Object From DB
    const user = await userModel.findOne({ username });
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
        client_id: GH_CLIENT,
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
    const finalURL = `${baseURL}${params}`;
    const data = await fetch(finalURL, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    });

    const json = await data.json();
    console.log(json);
};

export const logout = (req, res) => res.send("Log Out");

export const see = (req, res) => res.send("See");