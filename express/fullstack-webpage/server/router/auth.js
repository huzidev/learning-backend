import express  from "express";

// WE CREATE ROUTER JUST TO MAKE OURS CODE SIMPLE AND EASY TO UNDERSTAND JUST LIKE STYLE COMPONENTS OF REACT
require('../db/connection.js');


const router = express.Router();


router.use(express.urlencoded({extended : true}));


router.get('/', (req, res) => {
    res.send("Hello from router")
})

module.exports = router;