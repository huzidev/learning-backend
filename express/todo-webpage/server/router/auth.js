import express from "express";


const router = express.router();
require('../db/connection');

router.use(express.urlencoded({ extended : false }));

router.post('/register', async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err);
    }
})