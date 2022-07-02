import express  from "express";
import User from "../models/userSchema";

// WE CREATE ROUTER JUST TO MAKE OURS CODE SIMPLE AND EASY TO UNDERSTAND JUST LIKE STYLE COMPONENTS OF REACT
require('../db/connection.js');


const router = express.Router();


router.use(express.urlencoded({extended : true}));


// for REGISTRATION
router.post('/register', async (req, res) => {

    // getting all schema
    const { username, email, number, password, cpassword } = req.body;

    // if user left and tag empty
    if ( !username || !email || !number || !password || !cpassword ) {
        return res.status(422).json({ message : "You've left an tag empty" }) // json is used when message pop-up on window page as alert so ours web browser could understand it
    }

    // try catch the error
    try{
        // if user is already exists
    }
    catch (err) {
        console.log(err);
    }
})


router.get('/', (req, res) => {
    res.send("Hello from router")
})

module.exports = router;