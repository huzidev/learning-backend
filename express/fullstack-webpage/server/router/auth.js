import express  from "express";
import bcrypt from 'bcryptjs';
import User from "../models/userSchema";
import Contact from "../models/userMessage";
import Verification from '../middleware/Verification';
import cookie from "cookie-parser";
import cors from "cors";

// WE CREATE ROUTER JUST TO MAKE OURS CODE SIMPLE AND EASY TO UNDERSTAND JUST LIKE STYLE COMPONENTS OF REACT
require('../db/connection.js');

// setting router
const router = express.Router();


router.use(express.urlencoded({ extended : false }));
router.use(cookie());

router.use(cors({
    origin: '*'
}))

// for REGISTRATION
router.post('/register', async (req, res) => {

    
    // try catch the error
    try{
        // getting all schema
        const { username, email, number, password, cpassword } = req.body;
    
        // if user left and tag empty
        if ( !username || !email || !number || !password || !cpassword ) {
            return res.status(421).json({ error : "You've left an tag empty" }) // json is used when message pop-up on window page as alert so ours web browser could understand it
        }

        // if user is already exists
        const userExistEmail = await User.findOne({ email : email })
        const userExistName = await User.findOne({ username : username })
        const userExistNumber = await User.findOne({ number : number })
        if (userExistEmail) {
            return res.status(422).json({ error : "Email already exist" })
        }
        else if (userExistName) {
            return res.status(423).json({ error : "Username already exist" })
        }
        else if (userExistNumber) {
            return res.status(424).json({ error : "Number already exist" })
        }
        if (password != cpassword) {
            return res.status(425).json({ error : "Password doesn't match" })
        }
        // when user succeed for registration
        else {

            // user info
            const user = new User({ username, email, number, password, cpassword });

            // saving user data
            const userRegister = await user.save();

            // if user registered
            if (userRegister) {
                res.status(201).json({ message : "User registered successfully!" })
            }

            // if internal server error
            else {
                res.status(500).json({ message : "Failed to registered" })
            }
        }
    }
    catch (err) {
        console.log(err);
    }
})


// for LOGIN
router.post('/login', async (req, res) => {

    
    try{
        let token;
    
        //getting data from schema
        const {email, password} = req.body;
        
        // if (!username || !email || !password) {
        //     return res.status(421).json({ error : "You've left an tag empty!" });
        // }
        
        if (!email || !password) {
            return res.status(421).json({ error : "You've left an tag empty!" });
        }

        // checking user info
        const userEmail = await User.findOne({ email : email });
        // const userName = await User.findOne({ username : username });
        
        // if logging in with email
        if (userEmail) {
            // matching user email or username with password
            const isMatchEmail = await bcrypt.compare(password, userEmail.password);

            // generating token as user loggedIn
            token = await userEmail.generateAuthToken();
            console.log(token);

            // expire token duration
            res.cookie("jwtoken", token, {
                expires : new Date(Date.now() + 86400000), // user will be logged out automatically after 24 hours
                httpOnly : true
            });

            if (!isMatchEmail) {
                return res.status(400).json({ error : "Email or Password is incorrect" })
            }
            else {
                res.status(201).json({ message : "User loggedIn successfully" })
            }
        }
        
        // if logging in with username
        // else if (userName) {
        //     // matching user email or username with password
        //     const isMatchName = await compare(password, userName.password);

        //     if (!isMatchName) {
        //         return res.send(401).json({ error : "Username or Password is incorrect" })
        //     }
        //     else {
        //         res.status(201).json({ message : "User loggedIn successfully" })
        //     }
        // }
        
        // if password is incorrect, we'll not specify what is incorrect because this can help hacker to access user account
        else {
            return res.status(400).json({ error : "Username or Password is incorrect" })
        }

    }
    catch (err) {
        console.log(err);
    }
})

router.get('/about', Verification, (req, res) => {
    res.send(req.userInfo) // userInfo is created in Middleware
})

// for LOGOUT
router.get('/logout', (req, res) => { // we uses get because we get user's cookie then delete it
    res.clearCookie('jwtoken', { path : '/' })
    res.status(200).send("User loggedOut Successfully!")
})

module.exports = router;