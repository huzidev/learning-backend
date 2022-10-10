import express from "express";
import bcrypt from "bcrypt";
import User from '../models/userSchema';
import Contact from '../models/userMessage';
import Verification from '../middleware/Verification';
import cookie from 'cookie-parser';
import cors from "cors";

require('../db/connection');

const router = express.Router();

router.use(cors({
    origin: "*"
}));


router.use(express.urlencoded({ extended : false }));
router.use(cookie());

router.post('/register', async (req, res) => {
    const { username, email, number, password, cpassword } = req.body;

    if ( !username || !email || !number || !password || !cpassword ) {
        return res.status(422).json({ error : "You've left an tag empty" });
    }
    try {
        const emailExist = await User.findOne({ email : email })
        const usernameExist = await User.findOne({ username : username })
        const numberExist = await User.findOne({ number : number })

        if (emailExist) {
            return res.status(422).json({ error: "Email already Exist" });
        } else if (usernameExist) {
            return res.status(423).json({ error: "Username already Exist" });
        } else if (numberExist) {
            return res.status(423).json({ error: "Number already Exist" });
        } else if (password !== cpassword) {
            return res.status(425).json({ error : "Password doesn't match" })
        } else if (username.length < 4) {
            return res.status(426).json({ error : "Username's length must be greater than 4 characters" })
        } else if (password.length < 8 || cpassword.length < 8) {
            return res.status(427).json({ error : "Password's length must be greater than 8 characters" })
        } 
        // when user registered successfully
        else {
            const user = new User({ username, email, number, password, cpassword });
            const userRegister = await user.save();
            if (userRegister) {
                res.status(201).json({ message : "User registered successfully!" })
            } else {
                res.status(500).json({ message : "Failed to registered" })
            }
        }

    } catch (err) {
        console.log(err);
    }
})

router.post('/login', async (req, res) => {
    const {email, username, number, password} = req.body;
        
    if (!email || !password) {
        return res.status(421).json({ error : "You've left an tag empty!" });
    }
    try {
        const userEmail = await User.findOne({ email : email });
        const userName = await User.findOne({ username : username });
        const number = await User.findOne({ number : number });
        if (userEmail) {
            const isMatchEmail = await bcrypt.compare(password, userEmail.password);

            token = await userEmail.generateAuthToken();

            res.cookie("jwtoken", token, {
                expires : new Date(Date.now() + 86400000),
                httpOnly : true
            })
            if (!isMatchEmail) {
                return res.status(400).json({ error : "Email or Password is incorrect" })
            }
            else if (isMatchEmail) {
                res.status(201).json({ message : "User loggedIn successfully" })
            }
            else {
                res.status(500).json({ message : "Internal Server Error : Failed to registered!"})
            }
        } 
        else if (userName) {
            const isMatchName = await bcrypt.compare(password, userName.password);

            token = await userName.generateAuthToken();

            res.cookie("jwtoken", token, {
                expires : new Date(Date.now() + 86400000),
                httpOnly : true
            })
            if (!isMatchName) {
                return res.status(400).json({ error : "Username or Password is incorrect" })
            }
            else if (isMatchName) {
                res.status(201).json({ message : "User loggedIn successfully" })
            }
            else {
                res.status(500).json({ message : "Internal Server Error : Failed to registered!"})
            }
        }

    } catch (err) {
        console.log(err);
    }
})