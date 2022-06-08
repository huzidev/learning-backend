const express = require('express');
const router = express.Router();
// since we are not in Index.js the main file, therefore we've to use (router) instead of (server)

require('../db/connection'); 
const User = require('../models/userSchema');

// when we wanted to GET user data we uses POST because GET just brings data and POST Reads it or collect it so we can read it
router.post('/register', (req, res) => {

    const { username, email, number, passowrd, cpassowrd } = req.body;

    if ( !username || !email || !number || !passowrd || !cpassowrd ) {
        return res.status(422).json({ error : "You've left an tag empty" }); // because data is going to be in JSON format and we've to stringify it
    }

});

module.exports = router;