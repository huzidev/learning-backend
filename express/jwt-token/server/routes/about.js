const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');


router.get('/about', fetchuser, async (req, res) => {
    try {
        const user = await User.find({ user: req.user.id });
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})