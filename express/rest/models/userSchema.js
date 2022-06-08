const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ // new for creating new instance(example)
    name : {
        type : String,
        required : true // means compulsory
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
})

// model for linking ours schema with collection at mongoDB
const User = mongoose.model('USER', userSchema)