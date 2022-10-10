import express from "express";
import bcrypt from "bcrypt";
import Verification from '../middleware/Verification';
import cookie from 'cookie-parser';



const router = express.router();
require('../db/connection');

router.use(express.urlencoded({ extended : false }));

router.post('/register', async (req, res) => {

    const {  }

    try {

    } catch (err) {
        console.log(err);
    }
})