const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const Verification = async (req, res, next) => {

    try{

        const token = req.cookies.

    }
    catch (err) {
        res.status(401).send("Unauthorized : No token provided!");
        console.log(err);
    }

}

module.exports = Verification;