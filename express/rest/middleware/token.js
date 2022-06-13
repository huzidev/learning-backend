const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

const token = async (req, res, next) => {
    try{

        const userToken = req.cookies.jwt;
        const verifyUser = jwt.verify(userToken, process.env.SECRET_KEY);
        
    }
    catch (err) {
        res.status(401).send(err);
    }
}