import UserBuyer from '../models/userSchemaBuyer';
import jwt from 'jsonwebtoken';

const VerificationBuyer = async (req, res, next) => {
    try{
        // getting stored token from cookies therefore we've used req
        // const token = req.cookies.jwtoken;

        // verifying user
        const verifyBuyer = jwt.verify(req.cookies.jwtokenbuyer, process.env.SECRET_KEY);
        let verifyToken = verifyBuyer._id;

        // finding user data through token
        const buyerInfo = await UserBuyer.findOne({ 
            _id : verifyToken, 
            // comparing token from cookies with the token stored in the backend
            "tokens.token" : req.cookies.jwtokenbuyer 
        })
        if (!buyerInfo) {
            throw new Error("User not found"); // we'll not use return
        }

        // for getting user information to show in about page
        req.token = req.cookies.jwtokenbuyer;
        req.buyerInfo = buyerInfo;
        req.userID = buyerInfo._id;

        next();
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = VerificationBuyer;