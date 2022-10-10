import express from "express";
import bcrypt from "bcrypt";
import User from '../models/userSchema';
import Contact from '../models/userMessage';
import Verification from '../middleware/Verification';
import cookie from 'cookie-parser';
import cors from "cors";

require('../db/connection');

const router = express.Router();

router.use(cors({
    origin: "*"
}));


router.use(express.urlencoded({ extended : false }));
router.use(cookie());

router.post('/register', async (req, res) => {

    const { username, email, number, password, cpassword } = req.body;

    if ( !username || !email || !number || !password || !cpassword ) {
        return res.status(422).json({ error : "You've left an tag empty" });
    }

    try {
        const emailExist = await UserSeller.findOne({ email : email })
        const usernameExist = await UserSeller.findOne({ username : username })
        const numberExist = await UserSeller.findOne({ number : number })

        if (emailExist) {
            return res.status(422).json({ error: "Email already Exist" });
        } else if (usernameExist) {
            return res.status(423).json({ error: "Username already Exist" });
        } else if (numberExist) {
            return res.status(423).json({ error: "Number already Exist" });
        }

    } catch (err) {
        console.log(err);
    }
})