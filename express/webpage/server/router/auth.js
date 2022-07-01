const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const Verification = require("../middleware/Verification");
const cookie = require("cookie-parser");
const userSchema = require("../models/userSchema")
// since we are not in Index.js the main file, therefore we've to use (router) instead of (server)

// const cors = require("cors");


require('../db/connection'); 
const User = require('../models/userSchema');
const Contact = require('../models/userMessage');


router.use(express.urlencoded({ extended : false })); // compulsory
router.use(cookie());

// router.use(cors({
//     origin : '*'
// }))
// when we wanted to GET user data we uses POST because GET just brings data and POST Reads it or collect it so we can read it
router.post('/register', async (req, res) => {

    const { username, email, number, password, cpassword } = req.body;

    if ( !username || !email || !number || !password || !cpassword ) {
        return res.status(422).json({ error : "You've left an tag empty" }); // because data is going to be in JSON format
    }

    //Async Await
    try{
        // to check if user is already registered LEFT ONE IS KEY AND RIGHT ONE IS PROPERTY
        const userExist = await User.findOne({ email : email });// email at left is for userSchema and email at right is the email user going to insert
        // this email : email means if email at database is equal to email user is going to insert means promise TRUE and where their
        // is promise return we've to use await

        if (userExist) {
            return res.status(422).json({ error : "Email Already Exist" });
        }

        else if (password != cpassword) {
            return res.status(423).json({ error : "Password are not matching" });
        }

        else {
            //if user not REGISTERED already then we'll create an NEW Document for user data therefore we've used (const user = new User)
            const user = new User({ username, email, number, password, cpassword });//IF the instance is like username : name then we've 
            // to write it like that Example username : name etc means if key and property are same then just write any one
    
            const userRegister = await user.save();
    
            if (userRegister) {
                res.status(201).json({ message : "User Registered Successfully!" });
            }
            else{
                res.status(500).json({ error : "Failed To Registered" }); // 500 is database error
            }
        }
        
    }

    catch (err) {
        console.log(err);
    }
        
});

router.post('/login', async (req, res) => {

    try{

        let token;

        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(422).json({ error : "You've left an tag empty" });
        }

        const userLogin = await User.findOne({ email : email });
        // in case of login if email is equal to email present then success while at time of register we do opposite

        if (userLogin) {
            
            const isMatch = await bcrypt.compare(password, userLogin.password); // left one is the password user inserting and right one is the password with already exist email
            
            token = await userLogin.generateAuthToken();// userLogin gets complete data of user from backend including _id
            console.log(token);
           
            res.cookie("jwtoken", token, {
                expires : new Date(Date.now() + 2592000000), //means user will be logged out after 30 days automatically as cookie expires then token will also expires
                httpOnly : true // httpOnly means if https secure not present it'll works as well not necessary for https secure
            });

            if (!isMatch) {
                return res.status(400).json({ error : "Email Or Password Is Incorrect" });
            }
            else{
                res.status(201).json({ message : "User LoggedIn Successfully!" });
            }

        }
        
        else{
            return res.status(400).json({ error : "Email Or Password Is Incorrect" });
        }

    }

    catch (err) {
        console.log(err);
    }
    
})

router.post('/contact', async (req, res) => {

    const { username, email, number, message } = req.body;

    if ( !username || !email || !number || !message ) {
        return res.status(422).json({ error : "You've left an tag empty" }); // because data is going to be in JSON format
    }
    
    try{

        const userMessage = new Contact({ username, email, number, message });//IF the instance is like username : name then we've 
    
        const userResponse = await userMessage.save();
    
        if (userResponse) {
            res.status(201).json({ message : "Message Sent Successfully!" });
        }
        else{
            res.status(500).json({ error : "Failed To Send Message" }); // 500 is database error
        }
        
    }

    catch (err) {
        console.log(err);
    }

})

// About Us Page
router.get("/about", Verification, (req, res) => {// verification is MIDDLEWARE will open about page only if user have its jwtoken
    console.log("About us page");
    res.send(req.userInfo); // userInfo have all the data of user because we've defined it already in middleware
})

// router.get('/about', Verification,  async (req, res) => {
//     try {
//       userId = req.userInfo.id;
//       const user = await userSchema.findById(userId).select("-password")
//       res.send(user)
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//     }
//   })

module.exports = router;