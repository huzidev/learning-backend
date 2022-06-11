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

    message : {
        type : String,
        required : true,
    },
    // for storing the token for particular email where _id matches therefore we've write {_id : this_id}
    tokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ]
})