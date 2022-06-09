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

    // to check if user is already registered LEFT ONE IS KEY AND RIGHT ONE IS PROPERTY
    User.findOne({ email : email }) // email at left is for userSchema and email at right is the email user going to insert
    // this email : email means if email at database is equal to email user is going to insert means promise TRUE hence .then
        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({ error : "Email Already Exist" })
            }
            //if user not REGISTERED already then we'll create an NEW Document for user data therefore we've used (const user = new User)
            const user = new User({ username, email, number, password, cpassword })// IF the instance is like username : name then we've 
            // to write it like that Example username : name etc means if key and property are same then just write any one

            user.save().then(() => {
                res.status(201).json({ message : "User Registered Successfully!"});
            })
        })
});

module.exports = router;