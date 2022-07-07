import UserSeller from '../models/userSchemaSeller';
import jwt from 'jsonwebtoken';

const VerificationSeller = async (req, res, next) => {
    try{
        // getting stored token from cookies therefore we've used req
        // const token = req.cookies.jwtoken;

        // verifying user
        const verifySeller = jwt.verify(req.cookies.jwtoken, process.env.SECRET_KEY);
        let verifyToken = verifySeller._id;

        // finding user data through token
        const sellerInfo = await UserSeller.findOne({ 
            _id : verifyToken, 
            // comparing token from cookies with the token stored in the backend
            "tokens.token" : req.cookies.jwtoken 
        })
        if (!sellerInfo) {
            throw new Error("User not found"); // we'll not use return
        }

        // for getting user information to show in about page
        req.token = req.cookies.jwtoken;
        req.sellerInfo = sellerInfo;
        req.userID = sellerInfo._id;

        next();
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = VerificationSeller;