const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const Verification = async (req, res, next) => {

    try{

    }
    catch (err) {
        res.status(401).send("Unauthorized : No token provided!");
        console.log(err);
    }

}

module.exports = Verification;