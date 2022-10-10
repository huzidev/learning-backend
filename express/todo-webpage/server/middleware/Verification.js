import jwt from 'jsonwebtoken';
import User from '../models/userSchema';

const Verification = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        let tok = verifyUser._id;
        const userInfo = await User.findOne({
            _id: tok,
            "tokens.token": token // in mongoDB we've tokens in which token and :token is defined here
        })

        if (!userInfo) {
            res.status(404).send("User Not Found");
        }
    } catch (err) {
        res.status(401).send("No token provided");
        console.log(err);
    }
}