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
    }
    catch (err) {
        console.log(err);
    }
}