import express  from "express";
import User from "../models/userSchema";

// WE CREATE ROUTER JUST TO MAKE OURS CODE SIMPLE AND EASY TO UNDERSTAND JUST LIKE STYLE COMPONENTS OF REACT
require('../db/connection.js');


const router = express.Router();


router.use(express.urlencoded({extended : true}));


// main work
router.post('/register', async (req, res) => {
    const {username, email, number, password, cpassword} = req.body;
})


router.get('/', (req, res) => {
    res.send("Hello from router")
})

module.exports = router;