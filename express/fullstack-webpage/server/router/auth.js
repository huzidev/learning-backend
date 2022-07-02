import express  from "express";
import User from "../models/userSchema";

// WE CREATE ROUTER JUST TO MAKE OURS CODE SIMPLE AND EASY TO UNDERSTAND JUST LIKE STYLE COMPONENTS OF REACT
require('../db/connection.js');


const router = express.Router();


router.use(express.urlencoded({ extended : false }));


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
        //getting data from schema
        const {username, email, password} = req.body;
    
        if (!username || !email || !password) {
            return res.status(421).json({ error : "You've left an tag empty!" });
        }

        // checking user info
        const userEmail = await User.findOne({ email : email });
        const userName = await User.findOne({ username : username });

        if (userEmail) {
            // matching user email or username with password
            const isMatch = await compare(password, userEmail.password);

            if (!isMatch) {
                return res.send(400).json({ error : "Email or Password is incorrect" })
            }
            else {
                res.status(201).json({ message : "User loggedIn successfully" })
            }
        }

    }
    catch (err) {
        console.log(err);
    }
})


router.get('/', (req, res) => {
    res.send("Hello from router")
})

module.exports = router;