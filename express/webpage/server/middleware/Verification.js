const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const Verification = async (req, res, next) => {
    try{
        const token = req.cookies.jwtoken;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyUser);
        let tok = verifyUser._id; // verifyUser is already defined above for verifying jwtToken
        const userInfo = await User.findOne({ _id : tok, "tokens.token": token });// means inside mongoDB collection we've user collection tokens's inside token and :token is defined by us here
        // _id is the type which is written in ours backend mongodb it is not (id) it is (_id)

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