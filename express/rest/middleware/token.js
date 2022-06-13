const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

const token = async (req, res, next) => {
    try{

        const userToken = req.cookies.jwt;
        const verifyUser = jwt.verify(userToken, process.env.SECRET_KEY);
        console.log(verifyUser);

        const userInfo = User.findOne({ _id : verifyUser._id });
        console.log(userInfo);
        next();
        
    }
    catch (err) {
        res.status(401).send(err);
    }
}

module.exports = token;