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

// HASHING password
userSchema.pre('save', async function (next) { // we've to use (this.) therefore we can't use arrow function here
    if (this.isModified('password')) {
        // hash password
        this.password = await bcrypt.hash(this.password, 12)
        // hash cpassword
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next();
});


// GENERATING AUTH-TOKEN
userSchema.methods.generateAuthToken = async function () {
    try{
        // sign for creating token
        let token = jwt.sign({ _id : this._id }, process.env.SECRET_KEY)
        // concatenation of token inside tokens array we've created in schema
        this.tokens = this.tokens.concat({ token : token })
    }
    catch (err) {
        console.log(err);
    }
}


const User = mongoose.model('REDUX-USER', userSchema);

module.exports = User;