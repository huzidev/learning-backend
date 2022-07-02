import mongoose from "mongoose";
import bcrypt from ('bcryptjs'); // for securing user password
import jwt from ('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    number : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    cpassword : {
        type : String,
        required : true
    }
})

const User = mongoose.model('REDUX-USER', userSchema);

module.exports = User;