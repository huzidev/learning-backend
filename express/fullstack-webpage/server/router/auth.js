import express  from "express";


require('../db/connection.js');


const router = express.Router();


router.use(express.urlencoded({extended : true}));


router.get('/', (req, res) => {
    res.send("Hello from router")
})

module.exports = router;