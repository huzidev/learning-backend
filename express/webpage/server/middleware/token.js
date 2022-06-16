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
        next();
        
    }
    catch (err) {
        res.status(401).send(err);
    }
}

module.exports = token;