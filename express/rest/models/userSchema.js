const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ // new for creating new instance(example)
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
    password : {
        type : String,
        required : true
    },
    cpassword : {
        type : String,
        required : true
    },
})

// model for linking ours schema with collection at mongoDB
// const User is variable name and first word should've to be capital
const User = mongoose.model('USER', userSchema); 
// USER Parameter is the name of collection going to be created at DOCUMENT
// userScheme is the way (STRUCTURE) we wanted ours user data to be stored

module.exports = User;