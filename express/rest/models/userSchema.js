const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// HASHING password with bcryptjs
// we are creating pre function for password and pre function for save mean before running save we've to run bcrypt
// save function is in auth.js IMPORTANT we've to use simple function instead of arrow function because
// we are going to use (this) and (this) basically works as opposite of arrow function therefore simply simply function
userSchema.pre('save', async function (next) { //next parameter because of middleware
    console.log("hi test");
    if (this.isModified('password')) { // means if password changes
        this.password = await bcrypt.hash(this.password, 12); // this.password inside bracket is users current password 
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// model for linking ours schema with collection at mongoDB
// const User is variable name and first word should've to be capital
const User = mongoose.model('USER', userSchema); 
// USER Parameter is the name of collection going to be created at DOCUMENT
// userScheme is the way (STRUCTURE) we wanted ours user data to be stored

module.exports = User;
