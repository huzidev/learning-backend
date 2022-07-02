import User from '../models/userSchema';
import jwt from 'jsonwebtoken';

const Verification = async (req, res, next) => {
    try{
        // getting stored token from cookies
        const token = req.cookies.jwtoken;

        // verifying user
    }
    catch (err) {
        console.log(err);
    }
}