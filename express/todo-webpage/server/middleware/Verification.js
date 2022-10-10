import jwt from 'jsonwebtoken';
import User from '../models/userSchema';

const Verification = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        res.status(401).send("Unauthorized : No token provided");
        console.log(err);
    }
}