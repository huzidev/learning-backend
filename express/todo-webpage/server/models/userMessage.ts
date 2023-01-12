import mongoose from "mongoose";

const userMessage = new mongoose.Schema({
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
    },
    message : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now
    }
});

const Contact = mongoose.model('TODO-USERS-MESSAGES', userMessage); 

module.exports = Contact;