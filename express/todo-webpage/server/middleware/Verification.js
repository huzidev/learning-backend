import jwt from 'jsonwebtoken';
import User from '../models/userSchema';

const Verification = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
    } catch (err) {
        res.status(401).send("Unauthorized : No token provided");
        console.log(err);
    }
}