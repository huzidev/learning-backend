import User from '../models/userSchema';
import jwt from 'jsonwebtoken';

const Verification = async (req, res, next) => {
    try{
        // getting stored token from cookies therefore we've used req
        const token = req.cookies.jwtoken;

        // verifying user
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        let verifyToken = verifyUser._id;

        // finding user data through token
        const userInfo = await User.findOne({ 
            _id : verifyToken, 
            // comparing token from cookies with the token stored in the backend
            "tokens.token" : token 
        })
        if (!userInfo) {
            throw new Error("User not found"); // we'll not use return
        }

        // for getting user information to show in about page
        req.token = token;
        req.userInfo = userInfo;
        req.userID = userInfo._id;

        next();
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = Verification;