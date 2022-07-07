import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // for securing user password
import jwt from "jsonwebtoken";

const userSchemaBuyer = new mongoose.Schema({
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
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
})

// HASHING password
userSchemaBuyer.pre('save', async function (next) { // we've to use (this.) therefore we can't use arrow function here
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next();
});


// GENERATING AUTH-TOKEN
userSchemaBuyer.methods.generateAuthToken = async function () {
    try{
        // sign for creating token
        let token = jwt.sign({ _id : this._id }, process.env.SECRET_KEY);
        // concatenation of token inside tokens array we've created in schema
        this.tokens = this.tokens.concat({ token : token });
        // saving tokens
        await this.save();
        return token;
    }
    catch (err) {
        console.log(err);
    }
}


const UserBuyer = mongoose.model('REDUX-USER-SELLER', userSchemaBuyer);

module.exports = UserBuyer;