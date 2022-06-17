const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const cookieParser = require("cookie-parser");

const Verification = async (req, res, next) => {
    try{
        const token = req.cookies.jwtoken;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyUser);

        const userInfo = await User.findOne({ _id : verifyToken._id, "tokens.token": token });// means inside mongoDB collection we've user collection tokens's inside token and :token is defined by us here

        if (!userInfo) {
            throw new Error("User Not Found!");
        }

        // so we can get user's id, name, email with this method
        req.token = token;
        req.userInfo = userInfo; // will give us complete data of user and will use this in auth.js
        req.userID = userInfo._id; // for user's id

        next();
        
    }
    catch (err) {
        res.status(401).send("Unauthorized : No token provided");
        console.log(err);
    }
}

module.exports = Verification;