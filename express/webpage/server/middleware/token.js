const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

const token = async (req, res, next) => {
    try{

        const userToken = req.cookies.jwtoken;
        const verifyUser = jwt.verify(userToken, process.env.SECRET_KEY);
        console.log(verifyUser);

        const userInfo = await User.findOne({ _id : verifyUser._id });

        if (!userInfo) {
            throw new Error("User Not Found!");
        }

        console.log(userInfo);

        // so we can get user's id, name, email with this method
        req.userToken = userToken;
        req.userInfo = userInfo; // will give us complete data of user

        next();
        
    }
    catch (err) {
        res.status(401).send(err);
    }
}

module.exports = token;