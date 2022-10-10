require('../db/connection');
import express from "express";
import bcrypt from "bcrypt";
import Verification from '../middleware/Verification';
import cookie from 'cookie-parser';
import User from '../models/userSchema';
import userMessage from '../models/userMessage';

const router = express.Router();

router.use(express.urlencoded({ extended : false }));
router.use(cookie());

router.post('/register', async (req, res) => {

    try {
        const { username, email, number, password, cpassword } = req.body;

    if ( !username || !email || !number || !password || !cpassword ) {
        return res.status(422).json({ error : "You've left an tag empty" });
    }
    } catch (err) {
        console.log(err);
    }
})