const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ // new for creating new instance
    name : {
        type : String,
        required : true // means compulsory
    },
})