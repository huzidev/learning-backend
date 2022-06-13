const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

const token = async (req, res, next) => {
    try{

    }
    catch (err) {
        res.status(401).send(err);
    }
}