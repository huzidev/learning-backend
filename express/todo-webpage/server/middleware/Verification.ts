import jwt from 'jsonwebtoken';
const User = require("../middleware/userSchema").default
import { Request, Response, NextFunction } from 'express';

const Verification = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token: string = req.cookies.jwtoken;
        const verifyUser: any = jwt.verify(token, process.env.SECRET_KEY!);
        const userInfo: any = await User.findOne({
            _id: verifyUser._id,
            "tokens.token": token // in mongoDB we've tokens in which token and :token is defined here
        })
        if (!userInfo) {
            res.status(404).send("User Not Found");
        }
        req.token = req.cookies.jwtoken;
        req.userInfo = userInfo;
        req.userID = userInfo._id;
        next();
    } catch (err) {
        res.status(401).send("No token provided");
        console.log(err);
    }
}

module.exports = Verification;