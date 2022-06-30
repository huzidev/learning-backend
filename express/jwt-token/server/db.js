const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path : './config.env' });

const dB = process.env.DATA;

const connectToMongo = ()=>{
    mongoose.connect(dB, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;

