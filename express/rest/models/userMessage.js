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
   
})

const contact = mongoose.model('USERS_MESSAGES', userMessage); 

module.exports = contact;