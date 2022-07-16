import express  from "express";
import bcrypt from 'bcryptjs';
import UserBuyer from "../models/userSchemaBuyer";
import UserSeller from "../models/userSchemaSeller";
import Contact from "../models/userMessage";
import VerificationBuyer from '../middleware/VerificationBuyer';
import VerificationSeller from '../middleware/VerificationSeller';
import cookie from "cookie-parser";
import cors from "cors";

// WE CREATE ROUTER JUST TO MAKE OURS CODE SIMPLE AND EASY TO UNDERSTAND JUST LIKE STYLE COMPONENTS OF REACT
require('../db/connection.js');

// setting router
const router = express.Router();

router.use(cors({
    origin: '*',
}))

router.use(express.urlencoded({ extended : false }));
router.use(cookie());


// for REGISTRATION Seller
router.post('/register/seller', async (req, res) => {

    
    // try catch the error
    try{
        // getting all schema
        const { username, email, number, password, cpassword } = req.body;
    
        // if user left and tag empty
        if ( !username || !email || !number || !password || !cpassword ) {
            return res.status(421).json({ error : "You've left an tag empty" }) // json is used when message pop-up on window page as alert so ours web browser could understand it
        }

        // if user is already exists
        const userExistEmail = await UserSeller.findOne({ email : email })
        const userExistName = await UserSeller.findOne({ username : username })
        const userExistNumber = await UserSeller.findOne({ number : number })
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
        if (username.length < 4) {
            return res.status(426).json({ error : "username's length must be greater than 4 values" })
        }
        if (password.length < 8 || cpassword.length < 8) {
            return res.status(427).json({ error : "Password's length must be greater than 8 values" })
        }
        // when user succeed for registration
        else {

            // user info
            const user = new UserSeller({ username, email, number, password, cpassword });

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

router.post('/', function(req, res) {
    res.send("Home Page")
})


// for REGISTRATION Buyer
router.post('/register/buyer', async (req, res) => {

    
    // try catch the error
    try{
        // getting all schema
        const { username, email, number, password, cpassword } = req.body;
    
        // if user left and tag empty
        if ( !username || !email || !number || !password || !cpassword ) {
            return res.status(421).json({ error : "You've left an tag empty" }) // json is used when message pop-up on window page as alert so ours web browser could understand it
        }

        // if user is already exists
        const userExistEmail = await UserBuyer.findOne({ email : email })
        const userExistName = await UserBuyer.findOne({ username : username })
        const userExistNumber = await UserBuyer.findOne({ number : number })
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
        if (username.length < 4) {
            return res.status(426).json({ error : "username's length must be greater than 4 values" })
        }
        if (password.length < 8 || cpassword.length < 8) {
            return res.status(427).json({ error : "Password's length must be greater than 8 values" })
        }
        // when user succeed for registration
        else {

            // user info
            const user = new UserBuyer({ username, email, number, password, cpassword });

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


// for LOGIN as seller
router.post('/login/seller', async (req, res) => {

    try{
        let token;
    
        //getting data from schema
        const {email, password} = req.body;
        
        if (!email || !password) {
            return res.status(421).json({ error : "You've left an tag empty!" });
        }

        // checking user info
        const userEmail = await UserSeller.findOne({ email : email });
        
        // if logging in with email
        if (userEmail) {
            // matching user email or username with password
            const isMatchEmail = await bcrypt.compare(password, userEmail.password);

            // generating token as user loggedIn
            token = await userEmail.generateAuthToken();
            console.log(token);

            // expire token duration
            res.cookie("jwtokenseller", token, {
                expires : new Date(Date.now() + 86400000), // user will be logged out automatically after 24 hours
                httpOnly : true
            });

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
    }
    
    catch (err) {
        console.log(err);
    }
})


// for LOGIN as buyer
router.post('/login/buyer', async (req, res) => {

    
    try{
        let token;
    
        //getting data from schema
        const {email, password} = req.body;
        
        if (!email || !password) {
            return res.status(421).json({ error : "You've left an tag empty!" });
        }

        // checking user info
        const userEmail = await UserBuyer.findOne({ email : email });
        
        // if logging in with email
        if (userEmail) {
            // matching user email or username with password
            const isMatchEmail = await bcrypt.compare(password, userEmail.password);

            // generating token as user loggedIn
            token = await userEmail.generateAuthToken();
            console.log(token);

            // expire token duration
            res.cookie("jwtokenbuyer", token, {
                expires : new Date(Date.now() + 86400000), // user will be logged out automatically after 24 hours
                httpOnly : true
            });

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
    }
    catch (err) {
        console.log(err);
    }
})


router.post('/contact', async (req, res) => {

    try{
        // getting all schema
        const { username, email, number, message } = req.body;

        if ( !username || !email || !message ) {
            return res.status(422).json({ error : "You've left an tag empty!" });
        }
        const userMessage = new Contact({ username, email, number, message })
        const userResponse = await userMessage.save();

        // if success
        if (userResponse) {
            res.status(200).json({ message : "Message Sent Successfully!" });
        }
        else {
            res.status(500).json({ error : "Failed To Send Message" });
        }

    }
    catch (err) {
        console.log(err);
    }
})

// for getting all sellers data
router.get('/allSellers', async (req, res) => {
    try{
        const data = await UserSeller.find({})
        res.status(200).send(data)
    }
    catch (err) {
        console.log(err);
        res.status(421).send(err)
    }
})


// getting specific seller's info with theirs id
router.get('/allSellers/:id', async (req, res, next) => {
    try{
        let id = req.params.id
        const result = await UserSeller.findById(id)
        res.status(200).send(result)
    }
    catch (err) {
        console.log(err);
        res.status(421).send(err)
    }
})


// about page if login as seller
router.get('/about/seller', VerificationSeller, (req, res) => {
    res.send(req.sellerInfo) // userInfo is created in Middleware
})


// about page if login as buyer
router.get('/about/buyer', VerificationBuyer, (req, res) => {
    res.send(req.buyerInfo) // userInfo is created in Middleware
})

// for LOGOUT
router.get('/logout', (req, res) => { // we uses get because we get user's cookie then delete it
    res.clearCookie('jwtokenbuyer', { path : '/' })
    res.clearCookie('jwtokenseller', { path : '/' })
    res.status(200).send("User loggedOut Successfully!")
})

module.exports = router;