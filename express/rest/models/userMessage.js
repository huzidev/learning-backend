const mongoose = require('mongoose');

const userMessage = new mongoose.Schema({

    username : {
        type : String,
        required : true // means compulsory
    },
    email : {
        type : String,
        required : true
    },
    number : {
        type : Number,
        required : true
    },
    
    message : {
        type : String,
        required : true,
    },
    date : {
        type : date,
        default : date.now // no need for using () for date.now()
    }
   
})

const Contact = mongoose.model('USERS_MESSAGES', userMessage); 

module.exports = Contact;