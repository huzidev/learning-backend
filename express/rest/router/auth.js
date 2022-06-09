const express = require('express');
const router = express.Router();
// since we are not in Index.js the main file, therefore we've to use (router) instead of (server)

require('../db/connection'); 
const User = require('../models/userSchema');

// when we wanted to GET user data we uses POST because GET just brings data and POST Reads it or collect it so we can read it
router.post('/register', (req, res) => {

    const { username, email, number, password, cpassword } = req.body;

    if ( !username || !email || !number || !password || !cpassword ) {
        return res.status(422).json({ error : "You've left an tag empty" }); // because data is going to be in JSON format
    }

    // to check if user is already registered
    User.findOne({ email : email }) // email at left is for userSchema and email at right is the email user going to insert
        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({ error : "Email Already Exist" })
            }
        })
});

module.exports = router;